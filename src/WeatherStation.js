import React, { Component } from 'react';
import WeatherNote from './WeatherNote';

class WeatherStation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherObservations: [
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
    var timestamp = require('time-stamp');
    const modified = this.state.weatherObservations;
    modified.push(
      { id: this.state.weatherObservations.length + 1,
        temperature: this.state.value,
        submissionTime: timestamp('DD/MM/YYYY HH:mm:ss') }
    );
    this.setState(
      {weatherObservations: modified}
    );
    alert('An observation was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return(
      <div className="weather-station">
      <h1>{this.props.name}</h1>
      <h2>
        Highest temperature for the last 24 hours: {this.state.weatherObservations.length !== 0 && Math.max(...this.state.weatherObservations.map(o => o.temperature))} °C, lowest: {this.state.weatherObservations.length !== 0 && Math.min(...this.state.weatherObservations.map(o => o.temperature))} °C
      </h2>
      <h3>Temperatures (°C)</h3>
      {this.state.weatherObservations.length === 0 && <p>No observations</p>}
      {this.state.weatherObservations.map(
          obs =>
          <WeatherNote
          id={obs.id}
          temperature={obs.temperature}
          submissionTime={obs.submissionTime}
          handleChange={this.handleChange}
          />)}
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

export default WeatherStation;
