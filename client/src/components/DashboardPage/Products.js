import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {  green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Cookies from "universal-cookie";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import socketIOClient from "socket.io-client";
const useStyles = theme => ({
    success: {
        backgroundColor: green[600],
    },
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
    dialogue : {
        padding: '20%',
        height: '100%',
        width: '100%',
        display: 'flex',

    }

    });

class Products extends Component {
    // general methods for the Component
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:6060/" ,
            cards:[],
            openedit : false ,
            opendelete : false ,
            openview : false ,
            setOpen : false ,
            oldname : '' ,
            name : '',
            type : '',
            price : '' ,
            rating : '' ,
            warranty_years : '',
            available : '',
            snackmessage : '' ,
            opensnack : false
        }

    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    componentDidMount( ) {
        const socket = socketIOClient(this.state.endpoint);
        socket.on("RealTime", data => this.setState({ cards: data })
        );

    }
    closesnackbar  = () => {
        this.setState({ 'opensnack' :false , snackmessage :''});

    }


    // method to handle the dialoge of the view card bigger
    onviewcard =  params => event => {
        event.preventDefault();
        this.setState({ 'openview' :true});
        this.setState({
            name : params.name ,
            type : params.type,
            price : params.price ,
            rating :params.rating ,
            warranty_years : params.warranty_years,
            available : params.available
        });
    }
    handleCloseview  = params => event => {
        event.preventDefault();
        this.setState({ 'openview' :false});


    }

    // methods to handle dialogue of the delete card
    showonDeletefunction =  params => event => {
        event.preventDefault();
        this.setState({ 'opendelete' :true});
    }
    onDeletefunction = params => event => {
        const cookies = new Cookies();
        event.preventDefault();
        fetch('http://localhost:5050/api/products', {
            method: 'DELETE',
            body: JSON.stringify(params),
            headers: {
                'x-auth-token': cookies.get('token',{ path: '/' }) ,
                'Content-Type': 'application/json'
            }
        })
            .then( (results) => {
                if (results.status === 200) {
                    this.setState({ 'opendelete' :false , 'opensnack' : true ,  snackmessage : 'The Product is Deleted '});

                } else {
                    const error = new Error(results.error);
                    throw error
                } }
            )
            .catch(err => {
                alert('Error logging in please try again');
            });
    }
    handleClosedelete  = () => {
        this.setState({ 'opendelete' :false});

    }

    // methods to handle dialogue of the Edit card
    onEdit =  params => event => {
        event.preventDefault();
        this.setState({ 'openedit' :true});
        this.setState({
            oldname : params.name ,
            name : params.name ,
            type : params.type,
            price : params.price ,
            rating :params.rating ,
            warranty_years : params.warranty_years,
            available : params.available
            });


    }
    saveEdit = params => event => {
                const cookies = new Cookies();
                event.preventDefault();
                fetch('http://localhost:5050/api/products?name='+this.state.oldname, {
                    method: 'PUT',
                    body: JSON.stringify(this.state),
                    headers: {
                        'x-auth-token': cookies.get('token',{ path: '/' }) ,
                        'Content-Type': 'application/json'
                    }
                })
                    .then( (results) => {
                        if (results.status === 200) {
                            this.setState({ 'openedit' :false , opensnack : true , snackmessage : 'The Product is Edited '});
                        } else {
                            alert('Error logging in please try again error '+results);
                        } }
                    )
                    .catch(err => {
                        alert('Error logging in please try again '+err);
                    });

    };
    handleCloseedit = () => {
        this.setState({ 'openedit' :false});
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                {
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */
    }
                        <Grid container spacing={4}>
                            {this.state.cards.map(card => (
                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent} >
                                            <Typography gutterBottom variant="h4" component="h4" >
                                                {card.name}
                                            </Typography>
                                            <Typography >
                                                Item  : {card.type}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="h6" >
                                                Price : {card.price} Euro
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={this.onviewcard(card) }>
                                                View
                                            </Button>
                                            <Button size="small" color="primary" onClick={this.showonDeletefunction(card)}>
                                                Delete
                                            </Button>
                                            <Button size="small" color="primary" onClick={this.onEdit(card)}>
                                                Edit
                                            </Button>

                                            <Dialog
                                                open={this.state.opendelete}
                                                onClose={this.handleCloseedit}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">{"Product Danger Action !"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                     You are going to Delete The Item Agree ?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={this.handleClosedelete} color="primary">
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={this.onDeletefunction(card)} color="primary" autoFocus>
                                                        Confirm
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Dialog open={this.state.openedit} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Put the information that you want to change
                                                    </DialogContentText>
                                                    <Container component="main" maxWidth="xs">
                                                        <form className={classes.form} noValidate required onSubmit={this.onSubmit}>
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                id="name"
                                                                label="name"
                                                                name="name"
                                                                autoComplete="name"
                                                                autoFocus
                                                                value={this.state.name}
                                                                onChange={this.handleInputChange}

                                                            />
                                                            <InputLabel id="demo-simple-select-filled-label">type of product </InputLabel>
                                                            <Select
                                                                fullWidth
                                                                margin="normal"
                                                                id="type"
                                                                label="type"
                                                                name="type"
                                                                value={this.state.type}
                                                                onChange={this.handleInputChange}
                                                                required

                                                            >
                                                                <MenuItem value='phone'>phone</MenuItem>
                                                                <MenuItem value='laptop'>laptop</MenuItem>
                                                            </Select>
                                                            <TextField
                                                                type="number"
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                id="price"
                                                                label="price"
                                                                name="price"
                                                                autoComplete="price"
                                                                autoFocus
                                                                value={this.state.price}
                                                                onChange={this.handleInputChange}
                                                            />
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                id="rating"
                                                                label="rating"
                                                                name="rating"
                                                                autoComplete="rating"
                                                                autoFocus
                                                                type="number"
                                                                value={this.state.rating}
                                                                onChange={this.handleInputChange}

                                                            />

                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                type="number"
                                                                id="warranty_years"
                                                                label="warranty_years"
                                                                name="warranty_years"
                                                                autoComplete="warranty_years"
                                                                autoFocus
                                                                value={this.state.warranty_years}
                                                                onChange={this.handleInputChange}
                                                            />

                                                            <InputLabel  margin="normal"
                                                            >availablity</InputLabel>
                                                            <FormHelperText>Required</FormHelperText>
                                                            <Select
                                                                required
                                                                fullWidth
                                                                margin="normal"
                                                                id="available"
                                                                label="available"
                                                                name="available"
                                                                value={this.state.available}
                                                                onChange={this.handleInputChange}
                                                            >
                                                                <MenuItem value='true'>Yes</MenuItem>
                                                                <MenuItem value='false'>no</MenuItem>
                                                            </Select>

                                                        </form>
                                                    </Container>

                                                </DialogContent>

                                                <DialogActions>
                                                    <Button onClick={this.handleCloseedit} color="primary">
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={this.saveEdit(card)} color="primary">
                                                        Save
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>

                                            <Dialog      fullWidth className={classes.dialog}  onClose={this.handleCloseview(card)} aria-labelledby="customized-dialog-title" open={this.state.openview}>
                                                <DialogTitle id="customized-dialog-title" onClose={this.handleCloseview(card)}>
                                                    {this.state.name}
                                                </DialogTitle>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                                    title="Image title"
                                                />

                                                <DialogContent dividers>
                                                    <Typography gutterBottom>Name : {this.state.name}</Typography>
                                                    <Typography gutterBottom >Price : {this.state.price} Euro  </Typography>
                                                    <Typography gutterBottom >Type :  {this.state.type}</Typography>
                                                    <Typography gutterBottom > Warranty Years : {this.state.warranty_years} </Typography>
                                                    <Typography gutterBottom > Rate : {this.state.rating}/10</Typography>
                                                    <Typography gutterBottom>available : {this.state.available} </Typography>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button autoFocus onClick={this.handleCloseview(card)} color="primary">
                                                        Quit
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </CardActions>
                                    </Card>

                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.opensnack}
                    onChange={this.handleInputChange}
                    autoHideDuration={2000}
                    onClose={this.closesnackbar}
                >
                    <SnackbarContent
                        className={classes.success}
                        aria-describedby="client-snackbar"
                        message={<span id="client-snackbar" className={classes.message}>{this.state.snackmessage}</span>}

                    />
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })( Products) ;
