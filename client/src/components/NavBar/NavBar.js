import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
/*
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
*/
import {withStyles} from '@material-ui/core/styles';


const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});
class NavBar extends Component {

  render() {
    const { classes } = this.props
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Button className={classes.menuButton} aria-label="menu" color="inherit" href='/dashboard'>DashBoard</Button>
              <Button color="inherit" href='/addproduct'>AddProduct</Button>
              <Button variant="h6" className={classes.title} href='/'>
                React Project
              </Button>
              <Button color="inherit" href='/login'>Login</Button>
              <Button color="inherit" href='/signup'>Signup</Button>

            </Toolbar>
          </AppBar>
        </div>
    );

  }
}
export default withStyles(useStyles, { withTheme: true })( NavBar) ;
