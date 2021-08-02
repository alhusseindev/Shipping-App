import './Components/ShipmentPost/ShippingRequest';
import ShippingRequest from './Components/ShipmentPost/ShippingRequest';
import NavHeader from './Components/NavigationComponent/NavHeader';
import React from 'react'
import axios from 'axios';
import PassCodeScreen from "./Components/Pass Code Screen/PassCodeScreen";
import ShipmentsTable from './Components/Table Component/ShipmentsTable';
class App extends React.Component{
   render(){
    return(
            <div className="App">
                <NavHeader/>
                <PassCodeScreen/>
                {/** <ShippingRequest/> */}
                {/** <ShipmentsTable /> */}
            </div>
        );
    }
}

export default App;
