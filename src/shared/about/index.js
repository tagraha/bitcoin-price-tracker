import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class About extends Component {
  render() {
    return(
      <div id="aboutPage">
        <div className="row">
          <div className="column">
            <NavLink to="/"><small>Back to home</small></NavLink>
            <p>Made by love</p>
            <h1>dev.nugrata@gmail.com</h1>
          </div>
        </div>
      </div>
    )
  }
};

export default About;