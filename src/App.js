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
    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState(
      {value: parseInt(event.target.value, 10)}
    );
  }

  // TODO: check uid generation for this
  handleSubmit(event) {
    const modified = this.state.weatherObservations;
    modified.push(
      { id: this.state.weatherObservations.length + 1, temperature: this.state.value }
    );
    this.setState(
      {weatherObservations: modified}
    );
    alert('A observation was submitted: ' + this.state.value);
    event.preventDefault();
  }

  // TODO: check uid generation for this
  /*
  handleClick() {
    const modified = this.state.weatherObservations;
    modified.push(
      { id: this.state.weatherObservations.length + 1, temperature: -1 }
    );
    this.setState(
      {weatherObservations: modified}
    );
  }
  */

  componentWillMount() {
    // ...
  }

  /*
  handleChange = (event, id) => {
    const modified = this.state.weatherObservations;
    modified.map(obs => {
      if (obs.id === id) {
        obs.temperature = parseInt(event.target.value, 10) || "";
      }
      return obs;
    });
    this.setState(
      {weatherObservations: modified}
    );
  }
  */

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple Weather</h1>
        </header>
        <h1>Tokio (35.6584421,139.7328635)</h1>
        <h2>Temperatures (°C)</h2>
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
            Observation:
            <input type="number" value={parseInt(this.state.value, 10)} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
      );
    }
  }

  export default App;
