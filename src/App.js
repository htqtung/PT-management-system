import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { firebaseAuth } from './config/firebase';

import TrainingCalendar from './components/TrainingCalendar';
import About from './components/About';
import Customerlist from './components/Customerlist';
import Navigator from './components/Navigator';
import Traininglist from './components/Traininglist';
import Login from './components/Login';

import Cover from './assets/cover.jpg';

const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, isAuthenticated: false };
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true });
      }
      else {
        this.setState({ user: null, isAuthenticated: false });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={Cover} className="App-logo" alt="logo" />
        </header>
        <BrowserRouter>
          <div>
            <Navigator isAuthenticated={this.state.isAuthenticated} />
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/" component={About} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/customers" component={Customerlist} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/trainings" component={Traininglist} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/calendar" component={TrainingCalendar} />
              <Route render={() => <h1> Page not found </h1>} />
              {/* <Route exact path="/" render={() => <About />} />
              <Route path="/customers" component={Customerlist} />
              <Route path="/trainings" component={Traininglist} />
              <Route path="/calendar" component={TrainingCalendar} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

