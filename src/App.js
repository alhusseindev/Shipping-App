import './Components/ShipmentPost/ShippingRequest';
import React from 'react'
import axios from 'axios';
import NavHeader from './Components/NavigationComponent/NavHeader';
import ProtectedRoute from "./Components/ProtectedRoute Component/ProtectedRoute";
import ShippingRequest from "./Components/ShipmentPost/ShippingRequest";
import ShipmentsTable from "./Components/Table Component/ShipmentsTable";
import UpdateShipmentRequest from './Components/UpdateShipment/UpdateShipmentRequest';
import { BrowserRouter as Router, Switch} from "react-router-dom";
import { Redirect } from 'react-router-dom';
import {Button, Form} from "react-bootstrap";


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            passAccount: {
                email: "",
                password: ""
            },
            errorMessage: "",
            token: "",
            authenticated: false
        };
    }


    generateOTP = (email) =>{
        //this.state.passAccount.email === 'Email' ? this.setState({errorMessage:'Please enter a valid email'}) : axios.post(`http://localhost:5000/otp/generate-passcode/${this.state.passAccount.email.toString()}`, this.state.passAccount)
        axios.post(`http://localhost:5000/otp/generate-passcode`, {email})
            .then((response) => {
                let result = response.data;
            }).catch((error) =>{
                this.setState({errorMessage: `${error}`});
        });

        console.log(`submitRequest email: `, this.state.passAccount.email);
    }

    handleChange = (event) =>{
        console.log(`input detected`);
        const {name, value} = event.target;
        this.setState({passAccount: {...this.state.passAccount, [name]:value} });
    }


    authenticatedRoute = () =>{
        //if user has the JWT token if(this.state.token)
        if(this.state.authenticated === true) {
            let history = this.props.history;
            let myPassAccount = this.state.passAccount;
            //history.replace({pathname: "/shipping/request", state: {myPassAccount}});
            history.push({pathname: "/shipments/list", state: {myPassAccount}});
            console.log(history);
        }else{
            /**let history = this.props.history;
             let myPassAccount = this.state.passAccount;
             history.replace({pathname: "/", state:{myPassAccount}}); */
            return(<Redirect to="/" />);
        }
    }


    handleSubmit = (event) =>{
        console.log(`Form Submitted Successfully`);
        event.preventDefault();
    }


    confirmPassCode = async (email) =>{
        let result;
        let stateAccount;
        let authToken;
        try {
            //confirming passcode
            result = await axios.post(`http://localhost:5000/otp/findbyemail`, {email});

            stateAccount = this.state.passAccount
            stateAccount.email = email;
            this.setState({stateAccount});

            authToken = result.data.accessToken;
            this.setState({token:authToken});





            //console.log('authToken: ' + this.state.token);
            //console.log('Email: ' + email);
            //console.log('pass code: ' + this.state.passAccount.password);


            if(this.state.passAccount.email === result.data.Email && this.state.passAccount.password === result.data.OTPCode && this.state.token === authToken ){
                console.log(`Permisson Granted!`);
                this.setState({authenticated:true});
                this.setState({errorMessage: ""});
                this.setState({errorMessage: "Permisson Granted!"});


                /** Test these 2 lines */
                //localStorage.setItem("email", this.state.passAccount.email);
                //localStorage.setItem("accessToken", this.state.token);

                //this.setState({errorMessage: `${result.data}`});
                this.authenticatedRoute();



            }else{
                console.log(`Permisson Denied!`);
                this.setState({errorMessage:"Permission Denied!"});
            }


        }catch(error){
            this.setState({errorMessage: `${error}`});
        }
    }

    notLoggedInhomePage = () =>{
        if(this.state.authenticated === false) {
            return (
                <Form style={{display: 'block', marginLeft: '35%', marginRight: '35%'}} onSubmit={this.handleSubmit}>
                    <h1 style={{
                        display: 'block',
                        marginLeft: '35%',
                        marginRight: '35%',
                        textAlign: 'center',
                        fontFamily: 'Arial',
                        fontWeight: 'bold'
                    }}>Well Aliments Shipping</h1>
                    <br/>
                    <Form.Group style={{marginBottom: '0.5rem'}}>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="text" value={this.state.passAccount.email} onChange={this.handleChange}
                                      placeholder="Enter Email Address" style={{width: '25rem'}} name="email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={this.state.passAccount.password}
                                      onChange={this.handleChange} placeholder="Enter One Time Password"
                                      style={{width: '25rem'}} name="password"/>
                    </Form.Group>

                    {/** this.state.showElement === true ? this.onOTPClick : null */}
                    <hr style={{width: '25rem'}}/>
                    <div style={{textAlign: 'center'}}>
                        {this.state.errorMessage}</div>
                    <br/>
                    {/**this.state.errorMessage.concat("Please check your email, to access the portal using the link sent.") */}
                    <Button type="submit" style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: '0.5rem',
                        width: '10.5rem',
                        height: '2.5rem'
                    }} onClick={() => this.generateOTP(String(this.state.passAccount.email))}>Get OTP</Button>
                    <Button type="submit" style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '10.5rem',
                        height: '2.5rem',
                        marginBottom: '2rem'
                    }} onClick={() => {
                        this.confirmPassCode(String(this.state.passAccount.email));
                    }}>
                        Sign In</Button>
                </Form>
            );
        }else{
            return(<Redirect to="/shipments/list" />);
        }
    }

   render(){


    return(
        <Router>
            <NavHeader/>
            {this.notLoggedInhomePage()}

            <Switch>
                {/** It does not redirect to the page when using ProtectedRoute component */}
                <ProtectedRoute path="/shipping/request" exact component={ShippingRequest} authenticated={this.state.authenticated}   />
                <ProtectedRoute path="/shipments/list" exact component={ShipmentsTable} authenticated={this.state.authenticated} passAccount={this.state.passAccount}  />  {/** for the other object to get the email directly, I could do this.state.passAccount.email}, but I want to get the whole object and access it there. */}
                <ProtectedRoute path="/shipping/request/update" exact component={UpdateShipmentRequest} authenticated={this.state.authenticated} />
            </Switch>
        </Router>
        );
    }
}

export default App;
