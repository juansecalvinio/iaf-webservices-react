import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonLoader from './SendButton';

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
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClick (e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.container} noValidate autoComplete="off">
              <TextField
              label="Tipo Orden / Máscara"
              className={classes.textField}
              margin="normal"
              />
              <TextField
              label="Número de Orden"
              className={classes.textField}
              margin="normal"
              />
          </form>
        </CardContent>
        <CardActions>
          <ButtonLoader></ButtonLoader>
        </CardActions>
    </Card>        
    );
  }
}

FormInformarConsumo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormInformarConsumo);
