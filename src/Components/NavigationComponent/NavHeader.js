import React from 'react';
//import '../NavigationComponent/NavHeader.css';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavHeader(){

    return(
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

                <Link to="/shipments/list" style={{color: 'white', fontSize: '0.9rem', fontFamily: 'Arial', fontWeight: 'bold', marginRight: '2.5rem', textDecorationLine: 'none'}}>Shipments</Link>
                <Link to="/shipping/request" style={{color: 'white', fontSize: '0.9rem', fontFamily: 'Arial', fontWeight: 'bold', textDecorationLine: 'none', marginRight: '1.8rem'}}>Shipping Request</Link>

            </Navbar>
    );

}


export default NavHeader;