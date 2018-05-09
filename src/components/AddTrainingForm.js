import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';

class AddTrainingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            time: '',
            activity: '',
            duration: 0,
            customer: this.props.customer,
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    resetInputBox = () => {
        this.setState({
            date: '',
            time: '',
            activity: '',
            duration: 0,
        })
    }

    handleSubmit = (event) => {
        const newTraining = {
            date: this.state.date,
            activity: this.state.activity,
            duration: this.state.duration,
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
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="New Training">
                    <form>
                        <div className="form-group">
                            <input type="date"
                                className="form-control"
                                name="date"
                                onChange={this.handleChange}
                                placeholder="yyyy-mm-dd"
                                value={this.state.date} />
                        </div>
                        <div className="form-group">
                            <input type="time"
                                className="form-control"
                                name="time"
                                onChange={this.handleChange}
                                placeholder="hh:mm"
                                value={this.state.time} />
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
                        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Save</button>
                    </form>
                </SkyLight>
                <button className="btn btn-sm btn-primary" onClick={() => this.simpleDialog.show()}> Add Trainings </button>
            </div>
        );
    }
}

export default AddTrainingForm;