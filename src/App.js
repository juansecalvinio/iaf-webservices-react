import React, { Component } from 'react';
import './App.css';
import MaterialAppBar from './components/MaterialAppBar';
import MaterialTab from './components/MaterialTabs';

class Form extends Component {
  handleClick = (e) => {
    e.preventDefault();
    const pacienteId = document.getElementById('pacienteId').value;
    const tipoDeOrden = document.getElementById('tipoDeOrden').value;
    const ordenId = document.getElementById('ordenId').value;
    console.log({ e, pacienteId, tipoDeOrden, ordenId });
  }

  render() {
    return (
      <div>
        <h4>Informar Pago Paciente</h4>
        <form>
          <p>
            <label htmlFor="pacienteId">Paciente ID: </label>
            <input id="pacienteId" type="text"
              placeholder="paci_CodigoNumerico" />
          </p>
          <p>
            <label htmlFor="tipoDeOrden">Tipo OS: </label>
            <input id="tipoDeOrden" type="text" />
          </p>
          <p>
            <label htmlFor="ordenId">Numero OS: </label>
            <input id="ordenId" type="text" />
          </p>
          <button onClick={this.handleClick}>Informar</button>
        </form>
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <Form></Form>
      // <div>
      //   <MaterialAppBar></MaterialAppBar>
      //   <div id="container-app">
      //     <MaterialTab></MaterialTab>
      //   </div>
      // </div>
    );
  }
}

export default App;
