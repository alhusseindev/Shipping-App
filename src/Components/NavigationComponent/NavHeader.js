import React from 'react';
//import '../NavigationComponent/NavHeader.css';
import { Navbar, Container } from 'react-bootstrap';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ShippingRequest from "../ShipmentPost/ShippingRequest";
import ShipmentsTable from "../Table Component/ShipmentsTable";
import PassCodeScreen from "../Pass Code Screen/PassCodeScreen";
import ProtectedRoute from "../ProtectedRoute Component/ProtectedRoute";


function NavHeader(props){

    return(
        <Router>
            <Navbar className="bg-dark" style={{
                height: '4rem',
                marginBottom: '4rem'
            }}>
                <Container>
                  <Navbar.Brand style={{
                      color: 'white',
                      fontFamily: 'Arial, SansSerif',
                      fontSize: '1.5rem'
                  }} href="https://wellaliments.com/" target="_blank">Well Aliments</Navbar.Brand>
                </Container>
            </Navbar>
            <Switch>
                <Route exact path="/" component={PassCodeScreen} />


                {/**
                 *  replace true with authenticated of the PassCodeScreen component
                 * */}

                <ProtectedRoute exact path="/shipping/request" component={ShippingRequest}   />
                <ProtectedRoute exact path="/shipping/request/list" component={ShipmentsTable} />
            </Switch>
        </Router>
    );

}


export default NavHeader;