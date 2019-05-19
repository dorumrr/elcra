import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, withStyles, Fab } from '@material-ui/core';
import {
    // Menu as MenuIcon,
    ArrowForwardIos as MenuIcon,
    Fingerprint as FingerprintIcon,
    HomeOutlined as HomeIcon,
    InsertChartOutlined as ReportsIcon,
    HelpOutline as AboutIcon,
    ExitToAppOutlined as ExitIcon,
} from '@material-ui/icons';

const { ipcRenderer } = require('electron')

const styles = {
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    },
    list: {
      width: 280,
      height: '100vh',
      background: '#fff7e7'
    },
    menuButton: {
        position: 'fixed',
        top: 290,
        left: -35,
        paddingLeft: 33
    }
}

class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           isDrawerOpen: false
        }
    }

    toggleDrawer = (status) => () => {
        this.setState({
          isDrawerOpen: status,
        });
    };

    handleButtonClick =  async (cmd, arg) => {
        const data = await ipcRenderer.sendSync(cmd, arg);
        return data;
    }

    render() {
        const  { classes } = this.props;
        return (
            <div>

                <Fab onClick={this.toggleDrawer(true)} onMouseOver={this.toggleDrawer(true)} className={classes.menuButton}>
                    <MenuIcon />
                </Fab>

                <Drawer open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}>
                    <div tabIndex={0} role="button" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)} >

                        <div className={classes.list} onMouseLeave={this.toggleDrawer(false)}>

                            <List>
                                <ListItem button disabled>
                                    <ListItemIcon><FingerprintIcon /></ListItemIcon>
                                    <ListItemText primary="Elcra v0.0.1" />
                                </ListItem>
                            </List>

                            <Divider />

                            <List>

                                <Link to="/">
                                    <ListItem button>
                                        <ListItemIcon><HomeIcon /></ListItemIcon>
                                        <ListItemText primary="DASHBOARD" />
                                    </ListItem>
                                </Link>

                                <Link to="/reports">
                                    <ListItem button>
                                        <ListItemIcon><ReportsIcon /></ListItemIcon>
                                        <ListItemText primary="REPORTS" />
                                    </ListItem>
                                </Link>

                            </List>

                            <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}>
                                <Divider />
                                <List>

                                    <Link to="/about">
                                        <ListItem button>
                                            <ListItemIcon><AboutIcon /></ListItemIcon>
                                            <ListItemText primary="ABOUT" />
                                        </ListItem>
                                    </Link>

                                    <ListItem button onClick={() => this.handleButtonClick('app:quit')}>
                                        <ListItemIcon><ExitIcon /></ListItemIcon>
                                        <ListItemText primary="QUIT APP" />
                                    </ListItem>

                                </List>
                            </div>

                        </div>

                    </div>
                </Drawer>

            </div>
        )
    }
}

export default withRouter(withStyles(styles)(MainMenu))
