import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';
import FlatButton from 'material-ui/FlatButton';

import TrainingForm from './TrainingForm';

class AddTrainingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            activity: '',
            duration: 30,
            customer: this.props.customer,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleSlider = this.handleSlider.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDate = (date) => {
        this.setState({
            date: date
        })
    }

    handleSlider = (event, value) => {
        this.setState({ duration: value });
    };

    resetInputBox = () => {
        this.setState({
            date: '',
            activity: '',
            duration: 30,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newTraining = {
            date: moment(this.state.date).format(),
            activity: this.state.activity,
            duration: this.state.duration,
            customer: this.state.customer
        }
        this.resetInputBox();
        this.addTraining(newTraining);
        this.simpleDialog.hide();

    }

    addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTraining)
            }
        )
            .then(res => console.log('New training added'))
            .catch(err => console.error(err));
    }

    render() {
        var myTrainingForm = {
            width: '50%',
            minHeight: 300,
            minWidth: 400,
        };
        return (
            <div>
                <SkyLight dialogStyles={myTrainingForm} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="New Training">
                    <TrainingForm 
                        handleDate={this.handleDate}
                        handleChange={this.handleChange}
                        handleSlider={this.handleSlider}
                        handleSubmit={this.handleSubmit}
                        data={this.state}
                    />
                </SkyLight>
                <FlatButton onClick={() => this.simpleDialog.show()} primary={true} label="Add Trainings" />
            </div>
        );
    }
}

export default AddTrainingForm;