import React, { Component } from 'react';
import './App.css';
import MaterialAppBar from './components/MaterialAppBar';
import MaterialTab from './components/MaterialTabs';
import FormBasic from './components/FormBasic';


class App extends Component {
  render() {
    return (
      //<FormBasic></FormBasic>
      <div>
        <MaterialAppBar></MaterialAppBar>
        <div id="container-app">
          <MaterialTab></MaterialTab>
        </div>
      </div>
    );
  }
}

export default App;
