import React from 'react';
//import '../NavigationComponent/NavHeader.css';
import { Navbar, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';



let logout = () =>{
    //let tokens = document.cookie.split("=");
    localStorage.removeItem("accessToken");
}


const NavHeaderLinks = () =>{

    //if(props.token && props.authenticated) {
        return (
            <React.Fragment>
                <Link to="/shipments/list" style={{
                    color: 'white',
                    fontSize: '0.9rem',
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    marginRight: '2.5rem',
                    textDecorationLine: 'none'
                }}>Shipments</Link>
                <Link to="/shipping/request" style={{
                    color: 'white',
                    fontSize: '0.9rem',
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    textDecorationLine: 'none',
                    marginRight: '1.8rem'
                }}>Shipping Request</Link>
                <a href="https://wellaliments.com/" style={{
                    color: 'red',
                    border: '0.1rem',
                    fontSize: '0.9rem',
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    textDecorationLine: 'none',
                    marginRight: '1.8rem'
                }} onClick={() => {
                    let myCookie = document.cookie["accessToken"];
                }}>Logout</a>
            </React.Fragment>
        );
    //}
};



class NavHeader extends React.Component{

    render() {
        return (
            <Navbar className="bg-dark" style={{
                height: '4rem',
                marginBottom: '4rem'
            }}>
                <Container>
                    <Navbar.Brand style={{
                        color: 'white',
                        fontFamily: 'Times New Roman, Serif',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginLeft: '1rem'

                    }} href="https://wellaliments.com/" target="_blank">Well Aliments</Navbar.Brand>
                </Container>

                {NavHeaderLinks()}

            </Navbar>
        );
    }

}


export default NavHeader;
