import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import TrainingCalendar from './components/TrainingCalendar';
import About from './components/About';
import Customerlist from './components/Customerlist';
import Navigator from './components/Navigator';
import Traininglist from './components/Traininglist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">PT Fitness</h1>
        </header>
        <BrowserRouter>
          <div>
            <Navigator />
            <Switch>
              <Route exact path="/" render={() => <h2>Welcome to PT Fitness</h2>} />
              <Route path="/about" component={About} />
              <Route path="/customers" component={Customerlist} />
              <Route path="/trainings" component={Traininglist} />
              <Route path="/calendar" component={TrainingCalendar} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

