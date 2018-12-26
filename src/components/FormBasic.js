import React, { Component } from 'react';
import axios from 'axios';

class FormBasic extends Component {
    state = {
        response: '',
        pacienteId: '',
        tipoDeOrden: '',
        ordenId: '',
        responseToPost: '',
    };

    probarNode = async () => {
        const response = await axios.get('http://localhost:5000/api/hello');
        console.log(response);
        const body = await response;
        console.log(body);
        if(response.status !== 200) throw Error(body.message);
        return body
    }

    handleClickProbarNode = (e) => {
        e.preventDefault();
        this.probarNode()
        .then(res => {
            this.setState({ response: res['data']['express'] });
        })
        .catch(err => console.log(err));
    }

    // ?pacienteId=${data.pacienteId}&tipoDeOrden=${data.tipoDeOrden}&ordenId=${data.ordenId}

    informarPago = async (data) => {
        const response = await axios.post(`http://localhost:5000/api/informarPago`, { data });
        console.log(response);
        const body = await response;
        console.log(body);
        if(response.status !== 200) throw Error(body.message);
        return body;
    }

    handleSubmitInformarPago = async (e) => {
        e.preventDefault();

        const data = {
            pacienteId: parseInt(this.state.pacienteId),
            tipoDeOrden: parseInt(this.state.tipoDeOrden),
            ordenId: parseInt(this.state.ordenId),
        }

        console.log(data);

        this.informarPago(data)
        .then(res => {
            console.log(res['data']);
            this.setState({ responseToPost: res['data'] });
        })
        .catch(err => console.log(err));
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
      return (
        <div>
          <h4>Informar Pago Paciente</h4>
          <form onSubmit={this.handleSubmitInformarPago}>
            <p>
              <label htmlFor="pacienteId">Paciente ID: </label>
              <input 
                id="pacienteId" 
                name="pacienteId" type="text"
                placeholder="paci_CodigoNumerico"
                onChange={ e => this.setState({ pacienteId: e.target.value }) }
                value={this.state.pacienteId} />
            </p>
            <p>
              <label htmlFor="tipoDeOrden">Tipo OS: </label>
              <input 
                id="tipoDeOrden" 
                name="tipoDeOrden" type="text"
                onChange={ e => this.setState({ tipoDeOrden: e.target.value }) }
                value={this.state.tipoDeOrden} />
            </p>
            <p>
              <label htmlFor="ordenId">Numero OS: </label>
              <input 
                id="ordenId" 
                name="ordenId" type="text"
                onChange={ e => this.setState({ ordenId: e.target.value }) }
                value={this.state.ordenId} />
            </p>
            <button type="submit">Informar</button>
            <button onClick={this.handleClick}>Ver datos</button>
            <button onClick={this.handleClickProbarNode}>Probar Node JS</button>
            <p>{this.state.response}</p>
            <p>{this.state.responseToPost}</p>
          </form>
        </div>
      )
    }
}

export default FormBasic;