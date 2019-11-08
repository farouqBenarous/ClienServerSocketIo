import React from 'react';
import NavBar from '../NavBar/NavBar';
import {withStyles} from '@material-ui/core/styles';
import Header from "./Header";

//import socketIOClient from "socket.io-client";


const useStyles = theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
});

class HomePage extends React.Component{
  render() {
      //const { classes } = this.props
      return (
      <div >
          <NavBar/>
          <Header />
      </div>
    );

  }
}

export default withStyles(useStyles, { withTheme: true })( HomePage) ;
