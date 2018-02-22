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
      ],
      value: 0
    };
  }

  handleChange = (event) => {
    let val = event.target.value || 0;
    this.setState(
      {value: parseInt(val, 10)}
    );
  }

  handleSubmit = (event) => {
    const modified = this.state.weatherObservations;
    modified.push(
      { id: this.state.weatherObservations.length + 1, temperature: this.state.value }
    );
    this.setState(
      {weatherObservations: modified}
    );
    alert('An observation was submitted: ' + this.state.value);
    event.preventDefault();
  }

  componentWillMount() {
    // ...
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple Weather</h1>
        </header>
        <h1>Tokio (35.6584421,139.7328635)</h1>
        <h2>
          Highest temperature for the last 24 hours: {Math.max(...this.state.weatherObservations.map(o => o.temperature))} °C, lowest: {Math.min(...this.state.weatherObservations.map(o => o.temperature))} °C
        </h2>
        <h3>Temperatures (°C)</h3>
        {this.state.weatherObservations.length === 0 && <p>No observations</p>}
        {
          this.state.weatherObservations.map(
            obs =>
            <WeatherNote
            id={obs.id}
            temperature={obs.temperature}
            handleChange={this.handleChange}
            />
          )}
          <form onSubmit={this.handleSubmit}>
            <label>
            Observation (°C):
            <input type="number" value={parseInt(this.state.value, 10)} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
      );
    }
  }

  export default App;
