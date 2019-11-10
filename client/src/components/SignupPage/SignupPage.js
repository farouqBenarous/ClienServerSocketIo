import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';
import NavBar from '../NavBar/NavBar';

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
}) ;



class SignupPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email : '',
      firstname : '',
      lastname : '',
      password: ''
    };

  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    const cookies = new Cookies();
    event.preventDefault();
    fetch('http://localhost:5050/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( (results) => {
          if (results.status === 200) {
            return results.json()
          } else {
            const error = new Error(results.error);
            alert('Error logging in please try again' +results);
            throw error
          } }
        )
        .then(res => {
          cookies.set('token', res.token, { path: '/' });
          this.props.history.push('/dashboard');
        })
        .catch(err => {
          alert('Error logging in please try again' +err);
        });
  }


  render() {
    const { classes } = this.props
    return (
        <div>
          <NavBar />
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                      autoComplete="fname"
                      name="firstname"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstname"
                      label="First Name"
                      autoFocus
                      value={this.state.firstname}
                      onChange={this.handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastname"
                      label="Last Name"
                      name="lastname"
                      autoComplete="lname"
                      value={this.state.lastname}
                      onChange={this.handleInputChange}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={this.state.password}
                      onChange={this.handleInputChange}

                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>

          </Box>
        </Container>
        </div>
    );
  }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(SignupPage)) ;
