import React, { Component } from 'react';
import WeatherNote from './WeatherNote';

var firebase = require("firebase/app");
require("firebase/database");

const DEGREE_CAP = 100;

class WeatherStation extends Component {

  constructor(props) {
    super(props);
    this.config();
    this.state = {
      weatherObservations: [],
      value: 0,
      recent: 0
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

  writeWeatherData(station, temp, date) {
    firebase.database().ref('temperatures/' + station).set({
      temperature: temp,
      submissionTime : date
    });
  }

  handleChange = (event) => {
    let val = event.target.value || 0;
    val = val >= DEGREE_CAP ? DEGREE_CAP - 1 : val;
    val = val <= -DEGREE_CAP ? -DEGREE_CAP + 1 : val;
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
      {weatherObservations: modified,
        recent: this.state.value}
      );
      this.writeWeatherData(
        this.props.name,
        this.state.value,
        timestamp('YYYY-MM-DDTHH:mm:ss')
      );
      alert('An observation was submitted from ' + this.props.name + ': ' + this.state.value + ' °C on ' + new Date(timestamp('YYYY-MM-DDTHH:mm:ss')));
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
        this.state.weatherObservations.length !== 0 ? this.state.recent + ' °C' : '-'
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
