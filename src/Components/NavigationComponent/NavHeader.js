import React from 'react';
//import '../NavigationComponent/NavHeader.css';
import { Navbar, Container } from 'react-bootstrap';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ShippingRequest from "../ShipmentPost/ShippingRequest";
import ShipmentsTable from "../Table Component/ShipmentsTable";

function NavHeader(){

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
                <Route path="/shipping/request" component={ShippingRequest} />
                <Route path="/shipping/request/list" component={ShipmentsTable} />
            </Switch>
        </Router>
    );

}


export default NavHeader;