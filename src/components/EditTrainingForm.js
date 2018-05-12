import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class EditTrainingForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.training;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

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
            // backgroundColor: '#00897B',
            // color: '#ffffff',
            width: '70%',
            minHeight: 300,
            height: 300,
            marginTop: '-300px',
            marginLeft: '-35%',
        };
        return (
            <div>
                <SkyLight dialogStyles={myTrainingForm} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="New Training">
                    <form>
                        <div className="form-group">
                            <input type="datetime-local"
                                className="form-control"
                                name="date"
                                onChange={this.handleChange}
                                value={moment(this.state.date).format('YYYY-MM-DDTHH:mm')} />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                name="activity"
                                onChange={this.handleChange}
                                placeholder="Activity"
                                value={this.state.activity} />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Duration</span>
                            </div>
                            <input type="range"
                                className="form-control slider"
                                aria-describedby="inputGroup-sizing-sm"
                                name="duration"
                                max={180}
                                min={30}
                                step={10}
                                onChange={this.handleChange}
                                value={this.state.duration} />
                            <div className="input-group-append">
                                <span className="input-group-text" id="inputGroup-sizing-sm">{this.state.duration} mins</span>
                            </div>
                        </div>
                        <RaisedButton onClick={this.handleSubmit} primary={true} label="SAVE"/>
                    </form>
                </SkyLight>
                <FlatButton primary={true} onClick={() => this.simpleDialog.show()} label="EDIT"/>
            </div>
        );
    }
}

export default EditTrainingForm;