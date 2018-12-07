import React, { Component } from 'react';
import './App.css';
import SimpleAppBar from './components/SimpleAppBar';
import NavTabs from './components/NavTab';

class App extends Component {
  render() {
    return (
      <div>
        <SimpleAppBar></SimpleAppBar>
        <div id="container-app">
          <NavTabs></NavTabs>
        </div>
      </div>
    );
  }
}

export default App;
