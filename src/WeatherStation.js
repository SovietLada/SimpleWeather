import React, { Component } from 'react';
import WeatherNote from './WeatherNote';

class WeatherStation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherObservations: [
        { temperature: 10, submissionTime: new Date('2018-02-20T00:00:00') },
        { temperature: -10, submissionTime: new Date('2018-02-22T23:59:59') },
        { temperature: 5, submissionTime: new Date('2018-02-23T00:00:00') },
        { temperature: 2, submissionTime: new Date('2018-02-22T00:00:00') },
        { temperature: -1, submissionTime: new Date('2018-02-23T08:00:00') },
        { temperature: -20, submissionTime: new Date('2018-02-22T07:00:00') },
        { temperature: -24, submissionTime: new Date('2018-02-22T09:27:00') }
      ],
      value: 0
    };
  }

  handleChange = (event) => {
    let val = event.target.value || 0;
    val = val >= 100 ? 99 : val;
    val = val <= -100 ? -99 : val;
    this.setState(
      {value: parseInt(val, 10)}
    );
  }

  handleSubmit = (event) => {
    var timestamp = require('time-stamp');
    const modified = this.state.weatherObservations;
    modified.push({
      id: this.state.weatherObservations.length + 1,
      temperature: this.state.value,
      submissionTime: new Date(timestamp('YYYY-MM-DDTHH:mm:ss'))
    });
    this.setState(
      {weatherObservations: modified}
    );
    alert('An observation was submitted: ' + this.state.value + ' °C on ' + new Date(timestamp('YYYY-MM-DDTHH:mm:ss')));
    event.preventDefault();
  }

  getYesterday() {
    var timestamp = require('time-stamp');
    let now = new Date(timestamp('YYYY-MM-DDTHH:mm:ss'));
    let yesterday = new Date(now);
    return yesterday.setDate(now.getDate() - 1);
  }

  get24hMaxVal() {
    const result = this.state.weatherObservations.filter(obs => obs.submissionTime >= this.getYesterday());
    return (
      result.length !== 0 ? Math.max(...result.map(obs => obs.temperature)) : '-'
    );
  }

  get24hMinVal() {
    const result = this.state.weatherObservations.filter(obs => obs.submissionTime >= this.getYesterday());
    return (
      result.length !== 0 ? Math.min(...result.map(obs => obs.temperature)) : '-'
    );
  }

  getRecentSub() {
    return (
      this.state.weatherObservations.length !== 0 ? this.state.value + ' °C' : '-'
    );
  }

  getNotes() {
    return (
      <div>
      {this.state.weatherObservations.length === 0 && <p>No observations</p>}
      {this.state.weatherObservations.map(
        obs =>
        <WeatherNote
        id={obs.id}
        temperature={obs.temperature}
        submissionTime={obs.submissionTime}
        handleChange={this.handleChange} />)}
        </div>
      );
    }

    getForm() {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
        <label>Observation (°C):
        <input type="number"
        value={parseInt(this.state.value, 10)}
        onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>
        </div>
      );
    }

    render() {
      return (
        <div className="weather-station">
        <h1>{this.props.name}</h1>
        <h2>Highest temperature for the last 24 hours: {this.get24hMaxVal()} °C, lowest: {this.get24hMinVal()} °C</h2>
        <h3>Temperatures (°C), most recent submission: {this.getRecentSub()}</h3>
        {this.getNotes()}
        {this.getForm()}
        ------------------------------------------------------------------------
        </div>
      );
    }
  }

  export default WeatherStation;
