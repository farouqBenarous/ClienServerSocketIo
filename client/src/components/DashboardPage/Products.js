import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/*import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import AppBar from '@material-ui/core/AppBar';

import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';
*/
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

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards:[],
            open : false ,
            setOpen : false ,
            name : '',
            type : '',
            price : '' ,
            rating : '' ,
            warranty_years : '',
            available : '',
        }
    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    componentDidMount( ) {
        const cookies = new Cookies();
        fetch('http://localhost:5050/api/products', {
            method: 'GET',
            headers: {
                'x-auth-token': cookies.get('token',{ path: '/' }) ,
                'Content-Type': 'application/json'
            }
        })
            .then( (results) => {
                if (results.status === 200) {
                    return results.json()
                } else {
                    const error = new Error(results.error);
                    throw error
                } }
            )
            .then(res => {this.setState({cards: res});  })
            .catch(err => {
                alert('Error logging in please try again');
            });

    }


    onDeletefunction = params => event => {
        const nextValue = event.target.value;
        console.log('nextvalue' + nextValue)
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
                    alert('bsahtek yaaw')
                } else {
                    const error = new Error(results.error);
                    throw error
                } }
            )
            .catch(err => {
                alert('Error logging in please try again');
            });
    }


    onEdit =  params => event => {
        this.setState({ 'open' :true});
        this.setState({ 'setOpen' :true});
    }
    saveEdit = params => event => {
                const cookies = new Cookies();
                event.preventDefault();
                fetch('http://localhost:5050/api/products?name='+this.state.name, {
                    method: 'PUT',
                    body: JSON.stringify(this.state),
                    headers: {
                        'x-auth-token': cookies.get('token',{ path: '/' }) ,
                        'Content-Type': 'application/json'
                    }
                })
                    .then( (results) => {
                        if (results.status === 200) {
                            alert('Bsahtek yaaw');
                            this.setState({ 'open' :false});
                        } else {
                            const error = new Error(results.error);
                            throw error
                        } }
                    )
                    .catch(err => {
                        alert('Error logging in please try again');
                    });

    };
    handleClose = () => {
        this.setState({ 'open' :false});
        this.setState({ 'setOpen' :false});

    }
    render() {
        //const cookies = new Cookies();
        const { classes } = this.props
        return (
            <div>
                {
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {this.state.cards.map(card => (
                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="https://source.unsplash.com/random"
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {card.name}
                                            </Typography>
                                            <Typography>
                                                This is a media card. You can use this section to describe the content.
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={this.onDeletefunction(card) }>
                                                Delete
                                            </Button>
                                            <Button size="small" color="primary" onClick={this.onEdit(card)}>
                                                Edit
                                            </Button>
                                            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
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
                                                    <Button onClick={this.handleClose} color="primary">
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={this.saveEdit(card)} color="primary">
                                                        Save
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
            </div>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })( Products) ;
