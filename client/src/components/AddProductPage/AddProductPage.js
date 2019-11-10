import React from 'react';
import { amber, green } from '@material-ui/core/colors';
import NavBar from '../NavBar/NavBar';
import {withStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import { withRouter } from 'react-router-dom'
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Cookies from "universal-cookie";
import Container from "@material-ui/core/Container";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
const useStyles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}) ;

class AddProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            type : '',
            price : '' ,
            rating : '' ,
            warranty_years : '',
            available : '',
            open : false
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    closesnackbar  = () => {
        this.setState({ 'open' :false , snackmessage :''});

    }
    onSubmit = (event) => {
        const cookies = new Cookies();
        event.preventDefault();
        fetch('http://localhost:5050/api/products', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': cookies.get('token',{ path: '/' })

            }
        })
            .then( (results) => {
                if (results.status === 200) {
                    this.setState( {open : true ,
                        name : '',
                        type : '',
                        price : '' ,
                        rating : '' ,
                        warranty_years : '',
                        available : ''})
                    return;
                } else {
                    const error = new Error(results.error);
                    throw error
                } }
            )
            .catch(err => {
                alert('Error please try again' + err);
            });
    }

    render() {
        const { classes } = this.props
        return (
            <div>
            <NavBar />
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

                     <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}

                >
                    Save
                </Button>
            </form>
                </Container>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    onChange={this.handleInputChange}
                    autoHideDuration={3000}
                    onClose={this.closesnackbar}
                >
                    <SnackbarContent
                        className={classes.success}
                        aria-describedby="client-snackbar"
                        message={<span id="client-snackbar" className={classes.message}>The Product has been Added</span>}

                    />
                </Snackbar>
            </div>

        ); } }

export default  withRouter  (withStyles(useStyles, { withTheme: true })( AddProductPage)  ) ;
