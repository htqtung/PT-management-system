import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';
import FlatButton from 'material-ui/FlatButton';

import TrainingForm from './TrainingForm';

class EditTrainingForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.training;

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

    handleSubmit = (event) => {
        event.preventDefault();
        const newTraining = {
            date: moment(this.state.date).format(),
            activity: this.state.activity,
            duration: this.state.duration
        }
        this.props.editTraining(this.props.link, newTraining);
        this.simpleDialog.hide();
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
                <FlatButton primary={true} onClick={() => this.simpleDialog.show()} label="EDIT"/>
            </div>
        );
    }
}

export default EditTrainingForm;