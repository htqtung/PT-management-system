import React, { Component } from 'react';
import TrainingTable from './TrainingTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // import css

class Traininglist extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [] };

        this.loadTrainings = this.loadTrainings.bind(this);
        this.loadCustomerFromTrainings = this.loadCustomerFromTrainings.bind(this);
    }

    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(res => res.json())
            .then(resData => {
                this.setState({ trainings: resData.content })
                this.loadCustomerFromTrainings();
            });
    }

    loadCustomerFromTrainings = () => {
        for (let training of this.state.trainings) {
            fetch(training.links[2].href)
                .then(res => res.json())
                .then(resData => {
                    training.customer = resData.firstname + ' ' + resData.lastname;
                });
        }
    }

    deleteTraining = (value) => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Confirm your deletion',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(value, { method: 'DELETE' })
                            .then(res => this.loadTrainings())
                            .catch(err => console.error(err));

                        toast.success("Training deleted successfully!", {
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

    editTraining = (link, training) => {
        fetch(link,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(training)
            }
        )
            .then(res => this.loadTrainings())
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="App-body">
                <div className="container-fluid">
                    <TrainingTable data={this.state.trainings} deleteTraining={this.deleteTraining} editTraining={this.editTraining} />
                    <ToastContainer autoClose={1500} />
                </div>
            </div>
        );
    }
}

export default Traininglist;
