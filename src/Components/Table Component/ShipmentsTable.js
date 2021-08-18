import React from 'react';
//import './ShipmentsTable.css';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';


class ShipmentsTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            shipments: [
                {
                    id: 0,
                    user_account: "",
                    requestType: "",
                    customerName: "",
                    email: "",
                    companyName: "",
                    originAddress: "",
                    destinationAddress: "",
                    phoneNumber: "",
                    packageType: "",
                    typeOfCommodity: "",
                    noOfCommodities: "",
                    weight: "",
                    declaredValue: "",
                    scheduling: "",
                    date_submitted: ""

                },
            ],
            errorMessage: ""
        };

    }

    listShipments = async () =>{

        try {
            let fetchedShipments = await axios.get("http://localhost:8000/api/shipments/list/");
            /****** I get an error when the react axios cannot fetch data from api ****/
                //Unhandled Rejection (TypeError): Cannot read property 'data' of undefined, at line this.setState(errorMessage : this.state.....)

            let result = fetchedShipments.data;
            if(result === undefined){
                this.setState({errorMessage: ""});
                this.setState({errorMessage:`Loading Shipments`});
            }else {
                this.setState({shipments: result});
            }
        }catch(error){
            this.setState({errorMessage: ""});
            this.setState({errorMessage: `${error}`});
        }

    }


    getShipmentsByUser = async () =>{
        let emailToQueryBy = this.props.passAccount.email;
        console.log(emailToQueryBy);
        try {
            //App.js
            //if(this.props.passAccount.authenticated === true) {
                let fetchedShipments = await axios.get(`http://localhost:8000/api/users/account/${String(emailToQueryBy)}/shipments/`);
                let result = fetchedShipments.data;
                console.log(result);
                this.setState({shipments: result});
            //}
        }catch(error){
            this.setState({errorMessage: `${error}`});
        }
    }


    componentDidMount = () => {
        if(this.props.passAccount.email === "accounts@wellaliments.com" || this.props.passAccount.email === "dr.eweis@healthvance.com" || this.props.passAccount.email === "aeweis08@gmail.com") {
            this.listShipments();
        } else /**if (this.state.authenticated === true)*/ {
            this.getShipmentsByUser();
        }
    }

    updateSavedShipment = () =>{
        let history = this.props.history;  //in class components we use props to refer to the history and location attributes of React Router, for function components we use useHistory()
        let shipmentState = this.state.shipments;
        history.push({pathname:'/shipping/request/update', state:{shipmentState}});
    }

    addRow = ({id, requestType, customerName, email, companyName, originAddress, destinationAddress, phoneNumber, typeOfCommodity, noOfCommodities, weight, declaredValue, packageType, scheduling}) => {
        return (
                <tr className="resultsFetched" key={id} style={{ marginLeft: '0.5rem', marginRight: '0.5rem'}}>
                    <td>{requestType}</td>
                    <td>{customerName}</td>
                    <td>{email}</td>
                    <td>{companyName}</td>
                    <td>{originAddress}</td>
                    <td>{destinationAddress}</td>
                    <td>{phoneNumber}</td>
                    <td>{typeOfCommodity}</td>
                    <td>{noOfCommodities}</td>
                    <td>{weight}</td>
                    <td>{declaredValue}</td>
                    <td>{packageType}</td>
                    <td>{scheduling}</td>

                    <td className="resultsFetchedBtnCols">
                        <Button className="deleteBtn" onClick={() => {
                            this.deleteShipment(id);
                            console.log(`Shipment Number: ${id} Was Deleted Successfully`);
                            window.alert(`Shipment Was Deleted Successfully`);
                        }}>X</Button>


                        <Button className="updateBtn" style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '0.3rem', marginBottom: '0.3rem'}} onClick={() => this.updateSavedShipment()}>U</Button>
                    </td>
                </tr>
        );
    };


    deleteShipment = async (id) =>{
        if(window.confirm("Are you sure you want to delete the shipment?")){
            try {
                //calling the DELETE HTTP Verb / API endpoint
                let deleteData = await axios.delete(`http://localhost:8000/api/shipments/delete/${id}/`);
                let result = deleteData.data;
            }catch(error){
                this.setState({errorMessage: ""});
                this.setState({errorMessage: `${error}`});
            }
        }
    }


    render(){
        return(
            <Table className="submittedShipmentsTable" striped bordered hover responsive style={{ width: '100%'}}>
                <thead>
                {/**  <h1 style={{display: 'block', marginBottom: '2rem', textAlign: 'center'}}>Well Aliments Shipments Queue</h1>
                    <br/> */}
                    <tr id="myTableHeader">
                            <th>Request Type</th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Company Name</th>
                            <th>Address (Origin)</th>
                            <th>Address (Destination)</th>
                            <th>Phone Number</th>
                            <th>Type of Commodity</th>
                            <th>Number of Commodities</th>
                            <th>Weight</th>
                            <th>Declared Value</th>
                            <th>Package Type</th>
                            <th>Schedule</th>
                    </tr>
                </thead>
                <tbody>

                    {/*Adding Rows Automatically*/}
                    {/*what fixed the problem is that we are passing shipment as an object to the addRow() method,
                     which accepts an object {} as a parameter */}
                    {this.state.shipments.map((shipment, index) => this.addRow(shipment))}
                    {this.state.errorMessage}
                </tbody>
            </Table>
        );
    }
}

export default ShipmentsTable;