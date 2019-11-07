import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import  './HomePage.css'
class HomePage extends Component {
  render() {
    return (
      <div >
          <NavBar/>
          <div className="HomePage">
          <h2>Home Page</h2>
          </div>
      </div>
    );

  }
}

export default HomePage;
