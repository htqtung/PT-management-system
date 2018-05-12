import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';

class AddTrainingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            activity: '',
            duration: 30,
            customer: this.props.customer,
        };
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
        console.log(newTraining);
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
            // backgroundColor: '#00897B',
            // color: '#ffffff',
            width: '50%',
            minHeight: 300,
            height: 300,
            marginTop: '-300px',
            marginLeft: '-35%',
        };
        return (
            <div>
                <SkyLight dialogStyles={myTrainingForm} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="New Training">
                    <form>
                        <DateTimePicker
                            hintText="Date and Time"
                            onChange={this.handleDate}
                            DatePicker={DatePickerDialog}
                            TimePicker={TimePickerDialog}
                            fullWidth={true}
                            clearIcon={null}
                        />
                        {/* <input type="datetime-local"
                            className="form-control"
                            name="date"
                            onChange={this.handleChange}
                            // placeholder="yyyy-mm-dd"
                            value={this.state.date} /> */}
                        <TextField name="activity" hintText="Activity"
                            onChange={this.handleChange}
                            fullWidth={true}
                        />
                        <div className="row" style={{ borderColor: '#125242', borderWidth: 1, borderStyle: 'dashed', justifyContent: 'center' }}>
                            <div className="col-10" style={{ alignItems: 'center', justifyContent: 'center'}}>
                                <Slider
                                    name="duration"
                                    onChange={this.handleSlider}
                                    max={180}
                                    min={30}
                                    step={10}
                                    value={this.state.duration}
                                    style={{ borderColor: '#125242', borderWidth: 1, dborderStyle: 'dashed', height: 50}}
                                />
                            </div>
                            <div className="col-2">
                                <p style={{ borderColor: '#125242', borderWidth: 1, borderStyle: 'dashed' }} >{this.state.duration + 'mins'}</p>
                                    
                            </div>
                        </div>
                        
                        
                        <RaisedButton
                            icon={<FontIcon className="material-icons">save</FontIcon>}
                            onClick={this.handleSubmit}
                            primary={true}
                            label="SAVE"
                        />
                    </form>
                </SkyLight>
                <FlatButton onClick={() => this.simpleDialog.show()} primary={true} label="Add Trainings" />
            </div>
        );
    }
}

export default AddTrainingForm;