import React, { Component } from 'react';
import WeatherNote from './WeatherNote';

var firebase = require("firebase/app");
require("firebase/database");

const DEGREE_CAP = 100;

class WeatherStation extends Component {

  componentDidMount() {
    if (this.state.weatherObservations.length === 0) {
      const newData = this.returnWeatherData(this, this.props.name);
      this.setState(
        {weatherObservations: newData}
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      weatherObservations: [],
      value: 0,
      recent: undefined
    };
  }

  writeWeatherData(station, temp, date) {
    firebase.database().ref('temperatures/' + station + '/' + this.guid()).set({
      temperature: temp,
      submissionTime : date
    });
  }

  returnWeatherData = (context, station) => {
    var ret = [];
    var tempsRef = firebase.database().ref('temperatures/' + station + '/');
    tempsRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        ret.push({
          id: ret.length + 1,
          temperature: childData.temperature,
          submissionTime: childData.submissionTime
        });
      });
    });
    return ret;
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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
    this.writeWeatherData(
      this.props.name,
      this.state.value,
      new Date(timestamp('YYYY-MM-DDTHH:mm:ss')).toUTCString()
    );
    const modified = this.returnWeatherData(this, this.props.name);
    this.setState(
      {weatherObservations: modified, recent: this.state.value}
    );
    alert('An observation was submitted from ' + this.props.name + ': '
    + this.state.value + ' °C on ' + new Date(timestamp('YYYY-MM-DDTHH:mm:ss')));
    event.preventDefault();
  }

  getYesterday() {
    var timestamp = require('time-stamp');
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

  getRecentSub() {
    let date = undefined;
    let temp = undefined;
    var l = this.state.weatherObservations.length;
    for (var i = 0; i < l; i++) {
      let comp = new Date(this.state.weatherObservations[i].submissionTime);
      if (date < comp || date === undefined) {
        date = comp;
        temp = this.state.weatherObservations[i].temperature;
      }
    }
    return (
      this.state.weatherObservations.length !== 0 ? temp + ' °C' : '-'
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
            handleChange={this.handleChange} />)
          }
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
