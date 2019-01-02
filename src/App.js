import React, { Component } from 'react';
import './App.css';
import MaterialAppBar from './components/MaterialAppBar';
import MaterialTab from './components/MaterialTabs';
import FormBasic from './components/FormBasic';


class App extends Component {
  render() {
    return (
      //<FormBasic></FormBasic>
      <div id="screen-app">
        <MaterialAppBar></MaterialAppBar>
        <div className="container-app">
          <div id="container-app-form">
            <MaterialTab></MaterialTab>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
