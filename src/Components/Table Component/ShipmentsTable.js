    import React from 'react';
    import './ShipmentsTable.css';
    import axios from "axios";


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
                errorMessage: [],
                isLoading: false
            };

           this.getShipments = this.getShipments.bind(this);
           this.addRow = this.addRow.bind(this);
           this.deleteShipment = this.deleteShipment.bind(this);
        }

        getShipments = async () =>{
            return await axios.get("http://localhost:8000/app/shipments/list/")
                .then((response) =>{
                    /****** I get an error when the react axios cannot fetch data from api ****/
                        //Unhandled Rejection (TypeError): Cannot read property 'data' of undefined, at line this.setState(errorMessage : this.state.....)

                        let result = response.data;

                        console.log("result:", result);
                        this.setState({shipments: result, isLoading: false});


                }).catch((error) =>{
                    this.setState({errorMessage: this.state.errorMessage.push(error.response.data.messages)});

                });
        }


        componentDidMount() {
            this.getShipments();
        }


        addRow = ({id, requestType, customerName, email, companyName, originAddress, destinationAddress, phoneNumber, typeOfCommodity, noOfCommodities, weight, declaredValue, packageType, scheduling}) => {
            return (
                    <tr className="resultsFetched">
                        <td className="resultsFetchedColReq">{requestType}</td>
                        <td className="resultsFetchedColCust">{customerName}</td>
                        <td className="resultsFetchedColEm">{email}</td>
                        <td className="resultsFetchedColCN">{companyName}</td>
                        <td className="resultsFetchedColOA">{originAddress}</td>
                        <td className="resultsFetchedColDA">{destinationAddress}</td>
                        <td className="resultsFetchedColPN">{phoneNumber}</td>
                        <td className="resultsFetchedColTC">{typeOfCommodity}</td>
                        <td className="resultsFetchedColNC">{noOfCommodities}</td>
                        <td className="resultsFetchedColW">{weight}</td>
                        <td className="resultsFetchedColDV">{declaredValue}</td>
                        <td className="resultsFetchedColPT">{packageType}</td>
                        <td className="resultsFetchedColS">{scheduling}</td>

                        <td className="resultsFetchedBtnCols">
                            <button className="deleteBtn" onClick={() => {
                                this.deleteShipment(id);
                                console.log(`Shipment Number: ${id} Was Deleted Successfully`);
                                window.alert(`Shipment Number: ${id} Was Deleted Successfully`);
                            }}>X</button>


                                <button className="updateBtn" onClick={() => {
                                    const history = this.props.history;  //in class components we use props to refer to the history and location attributes of React Router, for function components we use useHistory()
                                    history.push('/shipping/request/update');
                                }}>U</button>
                        </td>
                    </tr>
            );
        };


        deleteShipment = (id) =>{
            if(window.confirm("Are you sure you want to delete the shipment?")){
                //calling the DELETE HTTP Verb / API endpoint
                axios.delete(`http://localhost:8000/app/shipments/delete/${id}`)
                    .then((response) =>{
                        let result = response.data;
                        console.log(result);
                    }).catch((error) =>{
                        console.log(error);
                });
            }
        }

        
        render(){
            return(
                <table className="submittedShipmentsTable">
                    <thead>
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

                    </tbody>
                </table>
            );
        }
    }

    export default ShipmentsTable;