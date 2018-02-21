import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherNote from './WeatherNote';
// TODO: lisää express.js

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherObservations: [
        { id: 1, temperature: 13 },
        { id: 2, temperature: 15 },
        { id: 3, temperature: 7 },
        { id: 4, temperature: 8 }
      ]
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(

    );
  }

  componentWillMount() {
    // ...
  }

  handleChange = (event, id) => {
    const modified = this.state.weatherObservations;
    modified.map(obs => {
      if (obs.id === id) {
        obs.temperature = parseInt(event.target.value, 10) || "";
      }
      return obs;
    });
    this.setState({weatherObservations: modified});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple Weather</h1>
        </header>
        <h1>Tokio (35.6584421,139.7328635)</h1>
        <h2>Temperatures (°C)</h2>
        {this.state.weatherObservations.length === 0 && <p>Ei havaintoja</p>}
        {
          this.state.weatherObservations.map(
            obs =>
            <WeatherNote
            id={obs.id}
            temperature={obs.temperature}
            handleChange={this.handleChange}
            />
          )}
          <button onClick={this.handleClick}>New obs</button>
        </div>
      );
    }
  }

  export default App;
