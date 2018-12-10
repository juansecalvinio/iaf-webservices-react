import React, { Component } from 'react';
import './App.css';
import SimpleAppBar from './components/SimpleAppBar';
import SimpleTab from './components/SimpleTab';

class App extends Component {
  render() {
    return (
      <div>
        <SimpleAppBar></SimpleAppBar>
        <div id="container-app">
          <SimpleTab></SimpleTab>
        </div>
      </div>
    );
  }
}

export default App;
