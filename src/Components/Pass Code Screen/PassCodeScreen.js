import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


class PassCodeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            passAccount: {
                email: "",
                password: ""
            },
            errorMessage: ''
        };
    }


    submitRequest = (event) =>{
        //this.state.passAccount.email === 'Email' ? this.setState({errorMessage:'Please enter a valid email'}) : axios.post(`http://localhost:5000/otp/generate-passcode/${this.state.passAccount.email.toString()}`, this.state.passAccount)
        axios.post(`http://localhost:5000/otp/generate-passcode/${String(this.state.passAccount.email)}`)
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



    handleSubmit = (event) =>{
        console.log(`Form Submitted Successfully`);
        event.preventDefault();
    }


    confirmPassCode = async (email) =>{
        let result;
        let stateEmail;
        try {
            result = await axios.get(`http://localhost:5000/otp/findbyemail/${email}`);

            stateEmail = this.state.passAccount
            stateEmail.email = email;
            this.setState({stateEmail});

            console.log('Email: ' + email);
            console.log('pass code: ' + this.state.passAccount.password);

            if(this.state.passAccount.password === result.data.OTPCode){
                console.log(`Permisson Granted!`);
                this.setState({errorMessage: ""});
                this.setState({errorMessage: "Permisson Granted!"});

                //Redirect to the form


            }else{
                console.log(`Permisson Denied!`);
                this.setState({errorMessage:""});
                this.setState({errorMessage:"Permisson Denied!"});
            }
        }catch(error){
            this.state.errorMessage = "";
            this.state.errorMessage.concat(`Error: ${error}`);
        }
    }
    




    render() {
        return (
            <Form style={{display: 'block', marginLeft: '35%', marginRight: '35%'}} onSubmit={this.handleSubmit}>
                <h1 style={{
                    display: 'block',
                    marginLeft: '35%',
                    marginRight: '35%',
                    textAlign: 'center',
                    fontFamily: 'Arial',
                    fontWeight: 'bold'
                }}>Well Aliments <br/> Shipping</h1>
                <br/>
                <Form.Group style={{marginBottom: '0.5rem'}}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" value={this.state.passAccount.email} onChange={this.handleChange} placeholder="Enter Email Address" style={{width: '25rem'}} name="email"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={this.state.passAccount.password} onChange={this.handleChange} placeholder="Enter One Time Password" style={{width: '25rem'}} name="password" />
                </Form.Group>

                {/** this.state.showElement === true ? this.onOTPClick : null */}
                <hr style={{width: '25rem'}}/>
                <div style={{textAlign: 'center'}}>{this.state.errorMessage}</div>
                <br/>
                {/**this.state.errorMessage.concat("Please check your email, to access the portal using the link sent.") */}
                <Button type="submit" style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '0.5rem',
                    width: '10.5rem',
                    height: '2.5rem'
                }} onClick={() => this.submitRequest()}>Get OTP</Button>
                <Button type="submit" style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '10.5rem',
                    height: '2.5rem',
                    marginBottom: '2rem'
                }} onClick={() => this.confirmPassCode(String(this.state.passAccount.email))}>
                    Sign In</Button>
            </Form>
        );
    }
}


export default PassCodeScreen;