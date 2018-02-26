import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherStation from './WeatherStation';
var firebase = require("firebase/app");
require("firebase/database");

class App extends Component {

  constructor(props) {
    super(props);
    this.config();
    this.state = {
      weatherStations: [
        { id: 1, name: 'Tokio' },
        { id: 2, name: 'Helsinki' },
        { id: 3, name: 'New York'},
        { id: 4, name: 'Amsterdam'},
        { id: 5, name: 'Dubai'}
      ]
    };
  }

  config() {
    if (!firebase.apps.length) {
      var config = {
        apiKey: "AIzaSyDXNe3noqv1orXteel9edHo6YV_tKWvDNw",
        authDomain: "simpleweather-d73a2.firebaseapp.com",
        databaseURL: "https://simpleweather-d73a2.firebaseio.com",
        projectId: "simpleweather-d73a2",
        storageBucket: "simpleweather-d73a2.appspot.com",
        messagingSenderId: "124534684590"
      };
      firebase.initializeApp(config);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple Weather 0.1</h1>
        </header>
        {
          this.state.weatherStations.map(
            station =>
            <WeatherStation
              id={station.id}
              name={station.name}
              />
          )}
        </div>
      );
    }
  }

  export default App;
