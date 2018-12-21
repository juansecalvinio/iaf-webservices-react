import React, { Component } from 'react';

class FormBasic extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
    };

    handleClick = async (e) => {
      e.preventDefault();
      const pacienteId = document.getElementById('pacienteId').value;
      const tipoDeOrden = document.getElementById('tipoDeOrden').value;
      const ordenId = document.getElementById('ordenId').value;
      console.log({ e, pacienteId, tipoDeOrden, ordenId });

      const response = await fetch('/api/informarPago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: this.state.post }),
      });
      
      const body = await response.text();
  
      this.setState({ responseToPost: body });
    }

    probarNode = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if(response.status !== 200) throw Error(body.message);
    }    

    handleClickProbarNode = (e) => {
        e.preventDefault();
        this.probarNode()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
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
            <button onClick={this.handleClickProbarNode}>Probar Node JS</button>
          </form>
          <p>{this.state.response}</p>
        </div>
      )
    }
}

export default FormBasic;