import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


class PassCodeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            passAccount: {
                email: "Email",
                password: "Password"
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
                this.setState({errorMessage: ''});
            });

        console.log(`submitRequest email: `, this.state.passAccount.email);
    }

    handleChange = (event) =>{
        console.log(`input detected`);
        let request = Object.assign({},this.state.passAccount);
        request.email = event.target.value;
        request.password = event.target.value;
        this.setState({passAccount: request});
     }

     confirmPassword = (password) =>{
        axios.get()
     }


    handleSubmit = (event) =>{
        console.log(`Form Submitted Successfully`);
        event.preventDefault();
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
                    <Form.Control type="text" value={this.state.email} onChange={this.handleChange} placeholder="Enter Email Address" style={{width: '25rem'}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" value={this.state.passcode} onChange={this.handleChange} placeholder="Enter One Time Password" style={{width: '25rem'}}/>
                </Form.Group>

                {/** this.state.showElement === true ? this.onOTPClick : null */}
                <hr style={{width: '25rem'}}/>
                <div>{this.state.errorMessage}</div>
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
                }}>
                    Sign In</Button>
            </Form>
        );
    }
}


export default PassCodeScreen;