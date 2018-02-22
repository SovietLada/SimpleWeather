import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherNote from './WeatherNote';
import WeatherStation from './WeatherStation';
// TODO: lisää express.js

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherStations: [
        { id: 1, name: 'Tokio (35.6584421,139.7328635)' },
        { id: 2, name: 'Helsinki: 60.1697530,24.9490830' },
        { id: 3, name: 'New York: 40.7406905,-73.9938438'},
        { id: 4, name: 'Amsterdam: 52.3650691,4.9040238'},
        { id: 5, name: 'Dubai: 25.092535,55.1562243'}
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple Weather</h1>
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
