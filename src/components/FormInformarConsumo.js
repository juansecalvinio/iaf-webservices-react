import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';


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

class FormInformarConsumo extends React.Component {
  state = {
    multiline: "Controlled",
    response: '',
    responseToPost: '',
    pacienteId: '',
    tipoDeOrden: '',
    ordenId: '',
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log(e);
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
      <CardContent>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmitInformarPago}>
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
                type="submit">Buscar</Button>
            </CardActions>
            <p>{this.state.responseToPost}</p>
        </form>
        </CardContent>
    </Card>        
    );
  }
}

FormInformarConsumo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormInformarConsumo);
