import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className="About container">
                <h1>Welcome to PT Fitness</h1>
                <h3>Task Case:</h3>
                <p>
                    A Personal Trainer company needs front end 
                    to their customer database. 
                    Database contains info about customers 
                    and their trainings. 
                    They have REST API and documentation
                    which contains all information needed for 
                    front end development.
                </p>
                <h4>Task 1.</h4>
                <p>Create pages to list customers and trainings</p>
                <p>List pages should contain following features:</p>
                <p>- Sorting</p>
                <p>- Searching</p>
                <h4>Task 2.</h4>
                <p>Add following CRUD functions to list pages</p>
                <p>- Add new Customer</p>
                <p>- Delete existing customer</p>
                <p>- Add training to customer</p>
                <p>- Delete training</p>
                <h4>Task 3.</h4>
                <p>- Add calendar page where user can see trainings (monthly, weekly, daily)</p>
                <p>- Add authentication using Firebase</p>
            </div>
        );
    }
}

export default About;