import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormInformarPago from './FormInformarPago';
import FormInformarConsumo from './FormInformarConsumo';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class MaterialTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} style={{'background-color': '#fff', 'color': '#B3296B'}}>
            <Tab label="Informar Pago Paciente" />
            <Tab label="Informar Consumo Prestación" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><FormInformarPago /></TabContainer>}
        {value === 1 && <TabContainer><FormInformarConsumo /></TabContainer>}
      </div>
    );
  }
}

MaterialTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialTabs);
