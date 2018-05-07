import React, { Component } from 'react';
import SkyLight from 'react-skylight';

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
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                name="firstname"
                                onChange={this.handleChange}
                                placeholder="First name" 
                                value={this.state.firstname} />
                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                name="lastname"
                                onChange={this.handleChange}
                                placeholder="Last name" 
                                value={this.state.lastname} />
                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                name="streetaddress"
                                onChange={this.handleChange}
                                placeholder="Address"
                                value={this.state.streetaddress} />
                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                name="postcode"
                                onChange={this.handleChange}
                                placeholder="Post Code"
                                value={this.state.postcode} />
                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                name="city"
                                onChange={this.handleChange}
                                placeholder="City"
                                value={this.state.city} />
                        </div>

                        <div className="form-group">
                            <input type="email"
                                className="form-control"
                                name="email"
                                onChange={this.handleChange}
                                placeholder="Email"
                                value={this.state.email} />
                        </div>

                        <div className="form-group">
                            <input type="tel"
                                className="form-control"
                                name="phone"
                                onChange={this.handleChange}
                                placeholder="Phone number"
                                value={this.state.phone} />
                        </div>

                        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Save</button>
                    </form>
                </SkyLight>
                <button className="btn btn-primary" style={{ margin: 16 }} onClick={() => this.simpleDialog.show()}> Add Customer </button>
            </div>
        );
    }
}

export default AddCustomerForm;