import React, { Component } from 'react';
import './App.css';
import HomePage from './components/HomePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <HomePage/>
        </div>
      </div>
    );
  }
}

export default App;
