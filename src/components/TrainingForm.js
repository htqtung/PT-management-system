import React, { Component } from 'react';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import DateTimePicker from 'material-ui-datetimepicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';

class TrainingForm extends Component {
    render() {
        let { date, activity, duration } = this.props.data;
        var dtp;
        if(date !== null)
            //EditTrainingForm calls
            dtp =   <DateTimePicker
                        hintText="Date and Time"
                        onChange={this.props.handleDate}
                        DatePicker={DatePickerDialog}
                        datePickerMode="landscape"
                        TimePicker={TimePickerDialog}
                        timeFormat="24hr"
                        fullWidth={true}
                        clearIcon={null}
                        value={moment(date).format('MMM DD, YYYY HH:mm')}
                    />;
        else
            //AddTrainingForm calls
            dtp =   <DateTimePicker
                        hintText="Date and Time"
                        format='MMM DD, YYYY hh:mm A'
                        onChange={this.props.handleDate}
                        DatePicker={DatePickerDialog}
                        datePickerMode="landscape"
                        TimePicker={TimePickerDialog}
                        timeFormat="24hr"
                        fullWidth={true}
                        clearIcon={null}
                    />;
        return (
            <form>
                {dtp}
                <TextField name="activity" hintText="Activity"
                    onChange={this.props.handleChange}
                    fullWidth={true}
                    value={activity}
                />
                <div className="row">
                    <div className="col-10" >
                        <Slider
                            name="duration"
                            onChange={this.props.handleSlider}
                            max={180}
                            min={0}
                            step={10}
                            value={duration}
                            style={{ height: 50 }}
                        />
                    </div>
                    <div className="col-2">
                        <p style={{ marginTop: 22 }} >{duration + 'mins'}</p>

                    </div>
                </div>
                <RaisedButton
                    icon={<FontIcon className="material-icons">save</FontIcon>}
                    onClick={this.props.handleSubmit}
                    primary={true}
                    label="SAVE"
                />
            </form>
        );
    }
}

export default TrainingForm;