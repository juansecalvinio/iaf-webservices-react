import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = theme => ({
    container: {
    display: "flex",
    flexWrap: "wrap"
    },
    textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
    },
    dense: {
    marginTop: 19
    },
    menu: {
    width: 200
    }
});

class FormInformarPago extends React.Component {
  state = {
    multiline: "Controlled",
    response: '',
    responseToPost: '',
    pacienteId: '',
    tipoDeOrden: '',
    ordenId: '',
  };

  probarNode = async () => {
    const response = await axios.get('http://localhost:5000/api/hello');
    console.log(response);
    const body = await response;
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
        //const xml = xmlToJson.xml2json(res['data'], {compact: false, spaces: 4});
        const response = res['data'];
        console.log(response);        
        this.setState({ responseToPost: response });
    })
    .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
      <CardContent>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmitInformarPago}>          
            <TextField
              label="Paciente ID"
              className={classes.textField}
              name="pacienteId"
              onChange={ e => this.setState({ pacienteId: e.target.value }) }
              margin="normal"
            />
            <TextField
              label="Tipo Orden / Máscara"
              className={classes.textField}
              name="tipoDeOrden"
              onChange={ e => this.setState({ tipoDeOrden: e.target.value }) }
              margin="normal"
            />
            <TextField
              label="Número de Orden"
              className={classes.textField}
              name="ordenId"
              onChange={ e => this.setState({ ordenId: e.target.value }) }
              margin="normal"
            />
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                type="submit">Informar</Button>
            </CardActions>
            <p>{this.state.responseToPost}</p>
        </form>
        </CardContent>
        {/* <CardContent>
          <Button onClick={this.handleClickProbarNode}>Probar Node JS</Button>
          <p>{this.state.response}</p>
        </CardContent> */}
    </Card>
    );
  }
}

FormInformarPago.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormInformarPago);
