import React from 'react';
import { /* BrowserRouter as Router, */ Redirect, Route, Switch, withRouter } from "react-router-dom";

import { withStyles } from '@material-ui/core';
import {} from '@material-ui/icons';

import { Home, Reports, About } from './pages'
import { SplashScreen, MainMenu } from './components'

// const { ipcRenderer } = require('electron')

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  content: {
    // border: '1px solid grey',
    // borderRadius: 5,
    // padding: 6,
    margin: 26
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false
    }
  }

  render() {
    const  { classes } = this.props;
    return (
      <div>

        <MainMenu />

        <div className={classes.content}>
          <Switch>
            <Route exact path="/loading" component={SplashScreen}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/reports" component={Reports}/>
            <Route exact path="/about" component={About}/>
            <Redirect to="/" />
          </Switch>
        </div>


      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
