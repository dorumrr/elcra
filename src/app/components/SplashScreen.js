import React from 'react';
import { /* Typography, */ withStyles } from '@material-ui/core';
import './SplashScreen.css';

// const { ipcRenderer } = require('electron')

const styles = {
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  grow: {
    flexGrow: 1
  },
  loadingMessage: {
    // border: '1px solid red',
    margin: 0
  }
}

class SplashScreen extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className="fancy-spinner">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="dot"></div>
        </div>
        {/* <Typography paragraph variant="subheading" align="center" className={classes.loadingMessage}>Loading...</Typography> */}
      </div>
    );
  }
}

export default withStyles(styles)(SplashScreen);
