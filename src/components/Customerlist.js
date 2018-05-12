import React, { Component } from 'react';
import CustomerTable from './CustomerTable';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // import css
import 'react-toastify/dist/ReactToastify.css';
import Snackbar from 'material-ui/Snackbar';

import AddCustomerForm from './AddCustomerForm';

class Customerlist extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            customers: [],
            open: false,
        };
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

                        this.setState({ open: true });
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

    // handleSnackBarActionClick = () => {
    //     this.setState({
    //         open: false,
    //     });
    //     alert('Event removed from your calendar.');
    // };

    handleSnackBarRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div className="App-body">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <AddCustomerForm addCustomer={this.addCustomer} />
                    </div>
                    <CustomerTable data={this.state.customers} deleteCustomer={this.deleteCustomer}/>
                    <Snackbar
                        open={this.state.open}
                        message='Customer data deleted successfully!'
                        // action="undo"
                        autoHideDuration={2000}
                        // onActionClick={this.handleSnackBarActionClick}
                        onRequestClose={this.handleSnackBarRequestClose}
                    />
                </div>
            </div>
        );
    }
}

export default Customerlist;
