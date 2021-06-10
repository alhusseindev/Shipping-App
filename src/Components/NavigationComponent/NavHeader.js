import React from 'react';
import '../NavigationComponent/NavHeader.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ShipmentsTable from "../Table Component/ShipmentsTable";
import ShippingRequest from "../ShipmentPost/ShippingRequest";

class NavHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Router>
                <nav className="topNav">
                    <h5 className="logo"><a className="logo" href="https://wellaliments.com/">Well Aliments</a></h5>
                </nav>
                <Switch>
                    <Route path="/shipping/request" component={ShippingRequest} />
                </Switch>
            </Router>
        );
    }

}


export default NavHeader;