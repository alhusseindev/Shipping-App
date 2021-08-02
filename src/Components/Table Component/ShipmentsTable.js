import React from 'react';
//import './ShipmentsTable.css';
import axios from "axios";
import { Table, Button } from 'react-bootstrap';


class ShipmentsTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shipments: [
                {
                    id: 0,
                    requestType: "Request Type",
                    customerName: "",
                    email: "",
                    companyName: "",
                    originAddress: "",
                    destinationAddress: "",
                    phoneNumber: "",
                    typeOfCommodity: "Type Of Commodity",
                    noOfCommodities: "",
                    weight: "",
                    declaredValue: "",
                    packageType: "Package Type",
                    scheduling: "Schedule"
                },
            ],
            errorMessage: ""
        };

    }

    getShipments = () =>{
        axios.get("http://localhost:8000/api/shipments/list/")
            .then((response) =>{
                /****** I get an error when the react axios cannot fetch data from api ****/
                //Unhandled Rejection (TypeError): Cannot read property 'data' of undefined, at line this.setState(errorMessage : this.state.....)
                if(undefined || null) {
                    return(<div>Loading Data!</div>);
                }

                let result = response.data;
                this.setState({shipments: result});

            }).catch((error) =>{
                this.setState({errorMessage: this.state.errorMessage.concat(error.response.data.messages)});
                return(<div>{this.state.errorMessage}</div>)
            });

    }


    componentDidMount() {
        this.getShipments();

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
                            window.alert(`Shipment Number: ${id} Was Deleted Successfully`);
                        }}>X</Button>


                            <Button className="updateBtn" style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '0.3rem', marginBottom: '0.3rem'}} onClick={() => {
                                const history = this.props.history;  //in class components we use props to refer to the history and location attributes of React Router, for function components we use useHistory()
                                history.push('/shipping/request/update');

                            }}>U</Button>
                    </td>
                </tr>
        );
    };


    deleteShipment = (id) =>{
        if(window.confirm("Are you sure you want to delete the shipment?")){
            //calling the DELETE HTTP Verb / API endpoint
            axios.delete(`http://localhost:8000/api/shipments/delete/${id}`)
                .then((response) =>{
                    let result = response.data;
                    //console.log(result);
                }).catch((error) =>{
                    this.setState({errorMessage: this.state.shipments.errorMessage.concat(error.response.data.messages)});
            });
        }
    }


    render(){
        return(
            <Table className="submittedShipmentsTable" striped bordered hover responsive style={{ width: '100%'}}>
                <thead>
                    <h1 style={{position: 'absolute', left: '30%'}}>Well Aliments Shipments Queue</h1>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
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
                    {}
                </tbody>
            </Table>
        );
    }
}

export default ShipmentsTable;