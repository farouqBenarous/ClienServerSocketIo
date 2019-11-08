import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from "./components/SignupPage/SignupPage";
import DashboardPage from "./components/DashboardPage/DashboardPage";
import AddProductPage from "./components/AddProductPage/AddProductPage";
import auth from "./components/auth";
import './App.css';


const Dashboard = () =>  (
    <DashboardPage />
);
const AddProduct = () =>  (
    <AddProductPage />
);

const Home = () => (
  <HomePage />
);

const Login = () => (
  <LoginPage />
);

const Signup = () => (
    <SignupPage/>
);
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Route exact path="/" component={Home} />
          <Route  path="/login" component={Login} />
          <Route path="/signup" component={Signup}   />
          <Route path="/dashboard" component={auth(Dashboard)} />
          <Route path="/addproduct" component={auth(AddProduct)} />

        </div>
      </Router>
    );
  }
}

export default App;
