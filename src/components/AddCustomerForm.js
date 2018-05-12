import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AddCustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    resetInputBox = () => {
        this.setState({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newCustomer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        }
        this.resetInputBox();
        this.props.addCustomer(newCustomer);
        this.simpleDialog.hide();
        
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="New Customer">
                    <form>
                        <TextField name="firstname" hintText="First name"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.firstname}
                        />
                        <TextField name="lastname" hintText="Last name"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.lastname}
                        />
                        <TextField name="streetaddress" hintText="Address"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.streetaddress}
                        />
                        <TextField name="postcode" hintText="Post code"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.postcode}
                            type="text"
                        />
                        <TextField name="city" hintText="City"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.city}
                        />
                        <TextField name="email" hintText="email@domain.com"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.email}
                            type="email"
                        />
                        <TextField name="phone" hintText="Phone number"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.phone}
                            type="text"
                        />

                        <RaisedButton onClick={this.handleSubmit} primary={true} label="SAVE"/>
                    </form>
                </SkyLight>
                <RaisedButton style={{ margin: 16 }} onClick={() => this.simpleDialog.show()} primary={true} label="Add Customer" />
            </div>
        );
    }
}

export default AddCustomerForm;