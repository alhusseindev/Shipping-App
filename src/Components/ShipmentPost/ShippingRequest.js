import React from 'react';
import './ShippingRequestStyles.css';
import axios from 'axios';


class ShippingRequest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            shipment: {
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
            errorMessage : Array(),
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
    }



    submitRequest = (event) =>{

        axios.post("http://localhost:8000/app/shipments/create/", this.state.shipment)
            .then((response) =>{
                let result = response.data;
                console.log(result);
            }).catch((error) =>{
            this.setState({errorMessage: this.state.errorMessage.push(error.response.data.message)});
            if(this.state.shipment.requestType.value === "Request Type" || this.state.shipment.typeOfCommodity.value === "Type Of Commodity" || this.state.shipment.packageType.value === "Package Type" || this.state.shipment.scheduling.value === "Schedule" || this.state.shipment.customerName.value === "" ||  this.state.shipment.email.value === "" || this.state.shipment.originAddress.value === "" || this.state.shipment.destinationAddress.value === ""){
                this.setState({errorMessage: "Please make sure you fill the required fields!"});

            }
            if(isNaN(this.state.shipment.phoneNumber) || isNaN(this.state.shipment.noOfCommodities) || isNaN(this.state.shipment.weight) || isNaN(this.state.shipment.declaredValue) || this.state.shipment.phoneNumber || this.state.shipment.noOfCommodities === "" || this.state.shipment.weight === "" || this.state.shipment.declaredValue === ""){
                this.setState({errorMessage: "Some fields must be Numeric"});
            }
            return(<div>{this.state.errorMessage}</div>);

        });

    }




    handleChange(event){
        //selecting shipment from the state
        const request = this.state.shipment;
        //updating the shipment keys and values
        request[event.target.name]= event.target.value;
        //setting the state
        this.setState({shipment: request});
        console.log("Input change detected");

    }


    handleFormSubmission(event){
        event.preventDefault();  //so the page doesn't send a request to the server when the form is submitted

        console.log("Submitted Successfully!");
        console.log(this.state.shipment);
    }

    render() {
        return (
            <form className="parent-container" onSubmit={this.handleFormSubmission}>

                <h1>Company Name's<br/> Shipping Department</h1>
                <br/>
                <label htmlFor="quoteOrLabel">Request Type: </label>
                <select required className="requestType" name="requestType" value={this.state.shipment.requestType} onChange={this.handleChange} placeholder="Request Type">
                    <option value="Request Type">Request Type</option>
                    <option value="Quote">Quote</option>
                    <option value="Label">Label</option>
                </select>
                <br/>
                <label htmlFor="customerName">Customer Name: </label>
                <input type="text" className="customerName" value={this.state.shipment.customerName} name="customerName" onChange={this.handleChange} placeholder="Customer Name" required/>
                <br/>
                <label htmlFor="email">Email: </label>
                <input type="text" className="email" name="email" value={this.state.shipment.email} onChange={this.handleChange} placeholder="Email" required/>
                <br/>
                <label htmlFor="companyName">Company Name: </label>
                <input type="text" className="companyName" value={this.state.shipment.companyName} name="companyName" onChange={this.handleChange} placeholder="Company Name"/>
                <br/>
                <label htmlFor="originAddress">Address (Origin): </label>
                <input type="text" className="originAddress" value={this.state.shipment.originAddress} name="originAddress" onChange={this.handleChange} placeholder="Address (Origin)" required/>
                <br/>
                <label htmlFor="destinationAddress">Address (Destination):</label>
                <input type="text" className="destinationAddress" value={this.state.shipment.destinationAddress} name="destinationAddress" onChange={this.handleChange} placeholder="Address (Destination)" required/>
                <br/>
                <label htmlFor="phoneNumber">Phone Number: </label>
                <input type="text" className="phoneNumber" value={this.state.shipment.phoneNumber} name="phoneNumber" onChange={this.handleChange} placeholder="Phone Number" required/>
                <br/>
                <label htmlFor="typeOfCommodity" id="typeOfCommodityLabel">Type of Commodity: </label>
                <select className="typeOfCommodity" value={this.state.shipment.typeOfCommodity} name="typeOfCommodity" onChange={this.handleChange} placeholder="Type Of Commodity" required>
                    <option value="Type Of Commodity">Type Of Commodity</option>
                    <option value="Bottles">Bottles</option>
                    <option value="Boxes">Boxes</option>
                    <option value="Pallets">Pallets</option>
                </select>
                <br/>
                <label htmlFor="noOfCommodities">Number Of Commodities: </label>
                <input type="text" className="noOfCommodities" value={this.state.shipment.noOfCommodities} name="noOfCommodities" onChange={this.handleChange} placeholder="Number of Commodities" required/>
                <br/>
                <label htmlFor="weight">Weight: </label>
                <input type="text" className="weight" value={this.state.shipment.weight} name="weight" onChange={this.handleChange} placeholder="Weight" required/>
                <br/>
                <label htmlFor="declaredValue">Declared Value: </label>
                <input type="text" className="declaredValue" value={this.state.shipment.declaredValue} name="declaredValue" onChange={this.handleChange} placeholder="Declared Value" />
                <br/>
                <label htmlFor="packageType">Package Type: </label>
                <select className="packageType" value={this.state.shipment.packageType} name="packageType" onChange={this.handleChange} placeholder="Package Type" required>
                    <option value="Package Type">Package Type</option>
                    <option value="Pallets">Pallets</option>
                    <option value="Boxes">Boxes</option>
                </select>
                <br/>
                <label htmlFor="scheduling" className="schedulingLabel">Schedule: </label>
                <select className="scheduling" value={this.state.shipment.scheduling} name="scheduling" onChange={this.handleChange} placeholder="Scheduling" required>
                    <option value="Schedule">Schedule</option>
                    <option value="Pick-up">Pick-Up</option>
                    <option value="Drop-Off">Drop-Off</option>
                </select>
                 <br/>
                <hr/>
                <div id="errorMessageDisplayed">
                    {this.state.errorMessage}
                </div>
                <button type="submit" className="submitShipment" onClick={this.submitRequest} onChange={this.handleChange}>Submit Shipping Request</button>


            </form>
        );
    }
}

export default ShippingRequest;