import React from 'react';
// import ReactDOM from 'react-dom';
import { Typography, Button } from '@material-ui/core';

const { ipcRenderer } = require('electron')
const packagejson = require('../../../package.json')

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      demo: null
    }
  }

  handleButtonClick = async () => {
    const data = await ipcRenderer.sendSync('get:demo', {})
    this.setState({demo: data.response})
  }

  render() {
    return (
      <div align="center">
        <Typography paragraph variant="h4" color="inherit" align="center">Welcome to Elcra Boilerplate v{packagejson.version}</Typography>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Button variant="contained" color="secondary" onClick={ this.handleButtonClick }>ipc Test</Button>
        <br />
        <br />
        <br />
        {this.state.demo ? ' '+this.state.demo : ''}
      </div>
    );
  }
}

export default Home;
