import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

class TextFields extends React.Component {
  state = {
    multiline: "Controlled",
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
            label="Paciente ID"
            className={classes.textField}
            onChange={this.handleChange("name")}
            margin="normal"
            />
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
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
