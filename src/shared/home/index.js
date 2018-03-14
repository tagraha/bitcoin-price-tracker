import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pure from 'recompose/pure';
import Helmet from 'react-helmet';
import './index.css';

class Home extends Component {
  render() {
    return (
      <div className="row">
        <Helmet
          title="Welcome to our Homepage"
        />
        <div className="column">
          <p className="selected">About</p>
          <p>
            <Link to="/repo">tagraha repo (async demo)</Link>
          </p>
        </div>
        <div className="column">
          <blockquote>
            <p><em>Sometimes when I close my eyes, I cant see :</em></p>
          </blockquote>
          <p>
            Twice a year we invest a small amount of mana in a large number of wizards (recently
            105).
          </p>
          <p>
            The wizards move to the Highlands of Scotland for 3 months, during which we work
            intensively with them to get the magic into the best possible shape and refine their
            pitch to patrons. Each cycle culminates in Demo Day, when the wizards present their
            magic to a carefully selected, invite-only audience.
          </p>
          <p>
            But WC doesn’t end on Demo Day. We and the WC alumni network continue to help mages for
            the life of their magic, and beyond.
          </p>
        </div>
      </div>
    );
  }
}

export default pure(Home);
