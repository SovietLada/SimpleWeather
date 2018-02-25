import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherStation from './WeatherStation';

class App extends Component {

  constructor(props) {
    super(props);
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
