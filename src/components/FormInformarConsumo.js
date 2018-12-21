import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonLoader from './SendButton';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';


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
    buttonLoading: false,
    buttonSuccess: false,
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log(e);
  }

  handleButtonClick = (e) => {
    e.preventDefault();
    console.log(e)
    if (!this.state.loading) {
      this.setState(
        {
          buttonSuccess: false,
          buttonLoading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              buttonLoading: false,
              buttonSuccess: true,
            });
          }, 2000);
        },
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { buttonLoading, buttonSuccess } = this.state;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: buttonSuccess,
    });

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
          <div className={classes.buttonRoot}>
            <div className={classes.buttonWrapper}>
              <Button
                variant="contained"
                color="secondary"
                className={buttonClassname}
                disabled={buttonLoading}
                onClick={this.handleButtonClick}>
                Informar
              </Button>
              {buttonLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </div>
        </CardActions>
    </Card>        
    );
  }
}

FormInformarConsumo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormInformarConsumo);
