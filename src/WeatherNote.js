import React, { Component } from 'react';

class WeatherNote extends Component {

  render() {
    return (
      <div className="weather-note">
        <input type="text"
          value={this.props.temperature + ' (' + this.props.submissionTime + ')'} />
      </div>
    );
  }
}

export default WeatherNote;
