import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import axios from "../../../server/node_modules/axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Alert } from 'reactstrap';

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
  },
  rootTable: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  alert: {
    margin: '1%',
    padding: '1%',
  },
});

class FormInformarConsumo extends React.Component {
  state = {
    multiline: "Controlled",
    response: '',
    error: '',
    alertColor: '',
    alertVisible: false,
    tableVisible: false,
    tipoDeOrden: '',
    ordenId: '',
    ordenes: [],
  };

  buscarOrdenes = async () => {
    const response = await axios.get(`http://localhost:5000/api/obtenerConsumos?tiposid=${this.state.tipoDeOrden}&osid=${this.state.ordenId}`);
    const body = await response;
    if(response.status !== 200) throw Error(body.message);
    return body;
  }

  handleBuscarOrdenes = (e) => {
    e.preventDefault();
    this.buscarOrdenes().then((res) => {
      const response = res;
      this.setState({ 
        ordenes: response['data']['consumos'],
        tableVisible: true,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  informarConsumo = async (data) => {
    const response = await axios.post('http://localhost:5000/api/informarConsumo', { data });
    console.log(`probarXML: ${response}`);
    const body = await response;
    if(response.status !== 200) throw Error(body.message);
    return body;
  }

  handleInformarConsumo = (e) => {
    e.preventDefault();
    var data = this.state.ordenes[0];
    console.log(data);
    this.informarConsumo(data).then(res => {
      console.log(res);
      this.setState({ 
        response: res.data,
        alertColor: "success",
        alertVisible: true
      });
      if(res.status !== 200) {
        this.setState({ 
          alertColor: "danger",
          alertVisible: true
        })
      }
      console.log(this.state.response);
    }).catch(err => {
      console.log(err.response);
      this.setState({ error: err });
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.container} 
              noValidate autoComplete="off">
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
                  onClick={this.handleBuscarOrdenes}>Buscar</Button>
              </CardActions>
          </form>
        </CardContent>
          <div className={classes.rootTable}>
            { this.state.tableVisible ? 
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Práctica</TableCell>
                  <TableCell align="right">Código</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.ordenes.map(orden => {
                    return (
                      <TableRow key={orden.Codigo}>
                        <TableCell align="right">{orden.Practica}</TableCell>
                        <TableCell align="right">{orden.Codigo}</TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
              <CardActions>
                <Button variant="contained" color="secondary" onClick={this.handleInformarConsumo}>Informar Consumo</Button>
              </CardActions>
            </Table> : null }
          </div>
        <CardContent>
          <Alert className="alert" color={this.state.alertColor} isOpen={this.state.alertVisible}>
            {this.state.response}
          </Alert>
        </CardContent>         
      </Card>    
    );
  }
}

FormInformarConsumo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormInformarConsumo);