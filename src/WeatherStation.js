import React, { Component } from 'react';
import WeatherNote from './WeatherNote';
var firebase = require("firebase/app");
require("firebase/database");
var timestamp = require('time-stamp');
const DEGREE_CAP = 100;

class WeatherStation extends Component {

  componentDidMount() {
    this.readWeatherData(this, this.props.name);
  }

  constructor(props) {
    super(props);
    this.state = {
      weatherObservations: [],
      value: 0,
      recent: null
    };
  }

  writeWeatherData(station, temp, date) {
    const newKey = firebase.database().ref().child('temperatures').push().key;
    firebase.database().ref('temperatures/' + station + '/' + newKey).set({
      temperature: temp,
      submissionTime : date
    });
  }

  readWeatherData = (context, station) => {
    var tempsRef = firebase.database().ref('temperatures/' + station + '/');
    tempsRef.on('value', function(snapshot) {
      let added = [];
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        added.push({
          id: added.length + 1,
          temperature: childData.temperature,
          submissionTime: childData.submissionTime
        });
      });
      context.setState((prevState, props) => ({
        weatherObservations: added
      }));
    });
  }

  handleChange = (event) => {
    let val = event.target.value || 0;
    if (val >= DEGREE_CAP) {
      val = DEGREE_CAP - 1;
    } else if (val <= -DEGREE_CAP) {
      val = -DEGREE_CAP + 1;
    }
    this.setState(
      {value: parseInt(val, 10)}
    );
  }

  handleSubmit = (event) => {
    let dateForSub = new Date(timestamp('YYYY-MM-DDTHH:mm:ss'));
    this.writeWeatherData(
      this.props.name,
      this.state.value,
      dateForSub.toUTCString()
    );
    alert('An observation was submitted from ' + this.props.name + ': '
    + this.state.value + ' °C on ' + dateForSub);
    event.preventDefault();
  }

  getYesterday() {
    let now = new Date(timestamp('YYYY-MM-DDTHH:mm:ss'));
    let yesterday = new Date(now);
    return yesterday.setDate(now.getDate() - 1);
  }

  get24hMaxVal() {
    const result = this.state.weatherObservations.filter(
      obs => new Date(obs.submissionTime) >= this.getYesterday()
    );
    return (
      result.length !== 0 ? Math.max(...result.map(obs => obs.temperature)) : '-'
    );
  }

  get24hMinVal() {
    const result = this.state.weatherObservations.filter(
      obs => new Date(obs.submissionTime) >= this.getYesterday()
    );
    return (
      result.length !== 0 ? Math.min(...result.map(obs => obs.temperature)) : '-'
    );
  }

  getRecentSubmission() {
    let date = null, temp = null;
    for (var i = 0, l = this.state.weatherObservations.length; i < l; i++) {
      let comp = new Date(this.state.weatherObservations[i].submissionTime);
      if (date < comp || date === null) {
        date = comp;
        temp = this.state.weatherObservations[i].temperature;
      }
    }
    return (
      this.state.weatherObservations.length !== 0 ? temp + ' °C' : '-'
    );
  }

  render() {
    return (
      <div className="weather-station">
        <h1>{this.props.name}: {this.getRecentSubmission()}</h1>
        <h2>Highest temperature for the last 24 hours: {this.get24hMaxVal()} °C; lowest: {this.get24hMinVal()} °C</h2>
          <form onSubmit={this.handleSubmit}>
            <label>New observation (°C):
              <input type="number"
                value={parseInt(this.state.value, 10)}
                onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        {this.state.weatherObservations.length === 0 && <p>No observations</p>}
        {this.state.weatherObservations.map(
          obs =>
          <WeatherNote
            id={obs.id}
            temperature={obs.temperature}
            submissionTime={obs.submissionTime} />)
          }
          ------------------------------------------------------------------------
        </div>
      );
    }
  }

  export default WeatherStation;
