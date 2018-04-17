import React, { Component } from 'react';
import TrainingTable from './TrainingTable';
// import { ToastContainer, toast } from 'react-toastify';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css'; // import css

class Traininglist extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [] };
    }

    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(res => res.json())
            .then(resData => {
                this.setState({ trainings: resData.content })
            });
    }

    // deleteCar = (value) => {
    //     confirmAlert({
    //         title: 'Confirmation',
    //         message: 'Confirm your deletion',
    //         buttons: [
    //             {
    //                 label: 'Yes',
    //                 onClick: () => {
    //                     fetch(value, { method: 'DELETE' })
    //                         .then(res => this.loadCars())
    //                         .catch(err => console.error(err));

    //                     toast.success("Car deleted successfully!", {
    //                         position: toast.POSITION.TOP_RIGHT
    //                     });
    //                 }
    //             },
    //             {
    //                 label: 'No',
    //                 onClick: () => console.log('Click No')
    //             }
    //         ]
    //     })

    // }

    // addCar = (newCar) => {
    //     fetch('https://carstockrest.herokuapp.com/cars',
    //         {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(newCar)
    //         }
    //     )
    //         .then(res => this.loadCars())
    //         .catch(err => console.error(err));
    // }

    // editCar = (link, car) => {
    //     fetch(link,
    //         {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(car)
    //         }
    //     )
    //         .then(res => this.loadCars())
    //         .catch(err => console.error(err));
    // }

    render() {
        return (
            <div className="App-body">
                <div className="container-fluid">
                    <h2>Trainings</h2>
                    {/* <div className="row align-items-center">
                        <AddCarForm addCar={this.addCar} />
                        <CSVLink data={this.state.cars} filename={"car-list.csv"}> Download table (.csv) </CSVLink>
                    </div> */}
                    <TrainingTable data={this.state.trainings} />
                    {/* <ToastContainer autoClose={1500} /> */}
                </div>
            </div>
        );
    }
}

export default Traininglist;
