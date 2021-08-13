import React from 'react';
//import './ShippingRequestStyles.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class ShippingRequest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            shipment: {
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
                scheduling: "Schedule",
                date_submitted: `Month: ${new Date().getMonth()} - Day: ${new Date().getDate()} - Year: ${new Date().getFullYear()}`
            },
            errorMessage : "",
        };

    }



    submitRequest = (event) =>{

        if(this.state.shipment.requestType.value === "Request Type" || this.state.shipment.typeOfCommodity.value === "Type Of Commodity" || this.state.shipment.packageType.value === "Package Type" || this.state.shipment.scheduling.value === "Schedule" || this.state.shipment.customerName.value === "" ||  this.state.shipment.email.value === "" || this.state.shipment.originAddress.value === "" || this.state.shipment.destinationAddress.value === ""){
            this.setState({errorMessage: "Please make sure you fill the required fields!"});

        }else if(isNaN(this.state.shipment.phoneNumber) || isNaN(this.state.shipment.noOfCommodities) || isNaN(this.state.shipment.weight) || isNaN(this.state.shipment.declaredValue) || this.state.shipment.phoneNumber || this.state.shipment.noOfCommodities === "" || this.state.shipment.weight === "" || this.state.shipment.declaredValue === ""){
            this.setState({errorMessage: "Some fields must be Numeric"});
        }else {
            axios.post("http://localhost:8000/api/shipments/create/", this.state.shipment)
                .then((response) => {
                    let result = response.data;
                    //console.log(result);
                }).catch((error) => {
                    this.setState({errorMessage: ''});
                    this.setState({errorMessage: error.response.data.message});

            });

            return (<div>{this.state.errorMessage}</div>);
        }
    }




    handleChange = (event) =>{
        //selecting shipment from the state
        const  {name, value} = event.target;
        //setting the state
        this.setState({shipment: { ...this.state.shipment, [name]: value }});
        console.log("Input change detected");

    }


    handleFormSubmission = (event) =>{
        event.preventDefault();  //so the page doesn't send a request to the server when the form is submitted

        console.log("Submitted Successfully!");
        console.log(this.state.shipment);
    }


    timeStamp = () =>{
        var myDate = new Date();
        let day = myDate.getDay();
        let month = myDate.getMonth();
        let year = myDate.getFullYear();
        let fullDate = `Month: ${month} - Day: ${day} - Year: ${year}`
        this.setState({date_submitted: fullDate});
    }

    updateShipment = (id) =>{
        if(window.confirm("Are you sure you want to update the selected shipment ?")) {
            axios.put(`http://localhost:8000/api/shipments/update/${id}`)
                .then((response) => {
                    let result = response.data;
                    window.alert(`Shipment Number: ${id} was updated successfully!`);

                }).catch((error) => {
                this.setState({errorMessage: this.state.errorMessage.concat(error.response.data.message)});

                /*
                if (this.state.shipment.requestType.value === "Request Type" || this.state.shipment.typeOfCommodity.value === "Type Of Commodity" || this.state.shipment.packageType.value === "Package Type" || this.state.shipment.scheduling.value === "Schedule" || this.state.shipment.customerName.value === "" || this.state.shipment.email.value === "" || this.state.shipment.originAddress.value === "" || this.state.shipment.destinationAddress.value === "") {
                    this.setState({errorMessage: error.response});

                }
                if (isNaN(this.state.shipment.phoneNumber) || isNaN(this.state.shipment.noOfCommodities) || isNaN(this.state.shipment.weight) || isNaN(this.state.shipment.declaredValue) || this.state.shipment.phoneNumber || this.state.shipment.noOfCommodities === "" || this.state.shipment.weight === "" || this.state.shipment.declaredValue === "") {
                    this.setState({errorMessage: error.response});
                }
                */

                return (<div>{this.state.errorMessage}</div>);

            });
        }

    }




    render() {
        return (
            <Form id="parent-container" onSubmit={this.handleFormSubmission} style={{marginLeft: '2rem', marginRight: '2rem'}}>
                <h1 style={{textAlign: 'center', color: 'green', fontFamily:"Times New Roman, Serif", fontWeight: 'bold'}}>Well Aliments<br/> Shipping Department</h1>
                <br/>
                <Form.Label htmlFor="quoteOrLabel">Request Type: </Form.Label>
                <Form.Control as="select" required id="requestType" name="requestType" value={this.state.shipment.requestType} onChange={this.handleChange} placeholder="Request Type">
                    <option value="Request Type">Request Type</option>
                    <option value="Quote">Quote</option>
                    <option value="Label">Label</option>
                </Form.Control>
                <br/>
                <Form.Label htmlFor="customerName">Customer Name: </Form.Label>
                <Form.Control type="text" id="customerName" value={this.state.shipment.customerName} name="customerName" onChange={this.handleChange} placeholder="Customer Name" required/>
                <br/>
                <Form.Label htmlFor="email">Email: </Form.Label>
                <Form.Control type="text" id="email" name="email" value={this.state.shipment.email} onChange={this.handleChange} placeholder="Email" required/>
                <br/>
                <Form.Label htmlFor="companyName">Company Name: </Form.Label>
                <Form.Control type="text" id="companyName" value={this.state.shipment.companyName} name="companyName" onChange={this.handleChange} placeholder="Company Name"/>
                <br/>
                <Form.Label htmlFor="originAddress">Address (Origin): </Form.Label>
                <Form.Control type="text" id="originAddress" value={this.state.shipment.originAddress} name="originAddress" onChange={this.handleChange} placeholder="Address (Origin)" required/>
                <br/>
                <Form.Label htmlFor="destinationAddress">Address (Destination):</Form.Label>
                <Form.Control type="text" id="destinationAddress" value={this.state.shipment.destinationAddress} name="destinationAddress" onChange={this.handleChange} placeholder="Address (Destination)" required/>
                <br/>
                <Form.Label htmlFor="phoneNumber">Phone Number: </Form.Label>
                <Form.Control type="text" id="phoneNumber" value={this.state.shipment.phoneNumber} name="phoneNumber" onChange={this.handleChange} placeholder="Phone Number" required/>
                <br/>
                <Form.Label htmlFor="typeOfCommodity" id="typeOfCommodityLabel">Type of Commodity: </Form.Label>
                <Form.Control as="select" id="typeOfCommodity" value={this.state.shipment.typeOfCommodity} name="typeOfCommodity" onChange={this.handleChange} placeholder="Type Of Commodity" required>
                    <option value="Type Of Commodity">Type Of Commodity</option>
                    <option value="Bottles">Bottles</option>
                    <option value="Boxes">Boxes</option>
                    <option value="Pallets">Pallets</option>
                </Form.Control>
                <br/>
                <Form.Label htmlFor="noOfCommodities">Number Of Commodities: </Form.Label>
                <Form.Control type="text" id="noOfCommodities" value={this.state.shipment.noOfCommodities} name="noOfCommodities" onChange={this.handleChange} placeholder="Number of Commodities" required/>
                <br/>
                <Form.Label htmlFor="weight">Weight: </Form.Label>
                <Form.Control type="text" id="weight" value={this.state.shipment.weight} name="weight" onChange={this.handleChange} placeholder="Weight" required/>
                <br/>
                <Form.Label htmlFor="declaredValue">Declared Value: </Form.Label>
                <Form.Control type="text" id="declaredValue" value={this.state.shipment.declaredValue} name="declaredValue" onChange={this.handleChange} placeholder="Declared Value" />
                <br/>
                <Form.Label htmlFor="packageType">Package Type: </Form.Label>
                <Form.Control as="select" id="packageType" value={this.state.shipment.packageType} name="packageType" onChange={this.handleChange} placeholder="Package Type" required>
                    <option value="Package Type">Package Type</option>
                    <option value="Pallets">Pallets</option>
                    <option value="Boxes">Boxes</option>
                </Form.Control>
                <br/>
                <Form.Label htmlFor="scheduling" className="schedulingLabel">Schedule: </Form.Label>
                <Form.Control as="select" id="scheduling" value={this.state.shipment.scheduling} name="scheduling" onChange={this.handleChange} placeholder="Scheduling" required>
                    <option value="Schedule">Schedule</option>
                    <option value="Pick-up">Pick-Up</option>
                    <option value="Drop-Off">Drop-Off</option>
                </Form.Control>
                 <br/>
                 <Form.Label htmlFor="dateSubmitted" className="submissionDateLabel">Date Submitted:</Form.Label>
                <Form.Control type="text" id="dateSubmitted" value={this.state.shipment.date_submitted} placeholder="Date Submitted (Auto)" disabled />
                <hr/>
                <div id="errorMessageDisplayed">
                    {this.state.errorMessage}
                </div>
                <Button type="submit" id="submitShipment" onClick={() => this.submitRequest} style={{marginBottom: '1.5rem', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>Submit Shipping Request</Button>
                {/** <button className="updateShipment" onClick={() => this.updateShipment(this.state.shipment.id)}>Update Shipment</button> */}


            </Form>
        );
    }
}

export default ShippingRequest;