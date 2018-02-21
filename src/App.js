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
        { id: 1, temperature: 0 },
        { id: 2, temperature: 30 }
      ]
    };
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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Tokio (35.6584421,139.7328635)</h1>
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
      </div>
    );
  }
}

export default App;
