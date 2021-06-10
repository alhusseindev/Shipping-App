import './Components/ShipmentPost/ShippingRequest';
import ShippingRequest from './Components/ShipmentPost/ShippingRequest';
import NavHeader from './Components/NavigationComponent/NavHeader';
import React from 'react'
import axios from 'axios';

class App extends React.Component{
   render(){
    return(
            <div className="App">
                <NavHeader/>
                <ShippingRequest/>
            </div>
        );
    }
}

export default App;
