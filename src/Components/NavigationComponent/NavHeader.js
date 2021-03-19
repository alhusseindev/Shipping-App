import React from 'react';
import '../NavigationComponent/NavHeader.css';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import ShipmentsTable from "../Table Component/ShipmentsTable";
import ShippingRequest from "../ShipmentPost/ShippingRequest";
import ShippingRequestUpdate from "../ShippingRequestUpdate/ShippingRequestUpdate";

class NavHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Router>
                <nav className="topNav">
                    <h5 className="logo"><a className="logo" href="#">Company Name</a></h5>
                    <ul className="linkblock">
                        <li><Link to="/" className="links">Home</Link></li>
                        <li><Link to="/shipping/request" className="links">Shipping Request</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/" component={ShipmentsTable} />
                    <Route path="/shipping/request" component={ShippingRequest} />
                    <Route path="/shipping/request/update" component={ShippingRequestUpdate} />
                </Switch>
            </Router>
        );
    }

}


export default NavHeader;