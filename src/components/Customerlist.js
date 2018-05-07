import React, { Component } from 'react';
import CustomerTable from './CustomerTable';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // import css
import 'react-toastify/dist/ReactToastify.css';

import AddCustomerForm from './AddCustomerForm';

class Customerlist extends Component {
    constructor(props) {
        super(props);
        this.state = { customers: [] };
    }

    componentDidMount() {
        this.loadCustomers();
    }

    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(res => res.json())
            .then(resData => {
                this.setState({ customers: resData.content })
            });
    }


    deleteCustomer = (value) => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Confirm your deletion',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(value, { method: 'DELETE' })
                            .then(res => this.loadCustomers())
                            .catch(err => console.error(err));

                        toast.success("Customer data deleted successfully!", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log('Click No')
                }
            ]
        })
    }

    addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCustomer)
            }
        )
            .then(res => this.loadCustomers())
            .catch(err => console.error(err));
    }

    // editCar = (link, car) => {
    //     fetch(link,
    //         {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(car)
    //         }
    //     )
    //         .then(res => this.loadCars())
    //         .catch(err => console.error(err));
    // }

    render() {
        return (
            <div className="App-body">
                <div className="container-fluid">
                    <h2>Customers</h2>
                    <div className="row align-items-center">
                        <AddCustomerForm addCustomer={this.addCustomer} />
                        {/* <CSVLink data={this.state.cars} filename={"car-list.csv"}> Download table (.csv) </CSVLink> */}
                    </div>
                    <CustomerTable data={this.state.customers} deleteCustomer={this.deleteCustomer}/>
                    <ToastContainer autoClose={1500} />
                </div>
            </div>
        );
    }
}

export default Customerlist;
