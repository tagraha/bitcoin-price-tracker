import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import pure from 'recompose/pure';
import Helmet from 'react-helmet';
import get from 'lodash/get';

import { tickerUpdate } from './../../../redux/ticker';

import './index.css';

let ws;
class Home extends Component {
  constructor(props) {
    super(props);
    this.openSocket = this.openSocket.bind(this);
  }

  componentDidMount() {
    this.openSocket();
  }

  openSocket() {
    ws = new WebSocket('wss://real.okcoin.com:10440/websocket');

    ws.onopen = () => {
      ws.send(JSON.stringify({'event':'addChannel','channel':'ok_sub_spot_btc_usd_ticker'}));
    }

    ws.onerror = () => {
      alert("websocket connection error");
    }

    // listen to onmessage event
    ws.onmessage = evt => { 
      const data = JSON.parse(evt.data);
      this.props.dispatch(tickerUpdate(data));
    };
  }

  componentWillUnmount() {
    ws.close();
  }

  render() {
    const { ticker } = this.props;
    return (
      <div className="row">
        <Helmet
          title="Welcome to our Homepage"
        />
        <div className="column">
          <p className="selected">About</p>
          <span>buy : {ticker.buy}</span> <br />
          <span>sell : {ticker.sell}</span> <br />
          <span>high : {ticker.high}</span> <br />
          <span>low : {ticker.low}</span> <br />
          <span>open : {ticker.open}</span> <br />
          <span>close : {ticker.close}</span> <br /><br />
          <span>change : {ticker.change}</span>
          <p>
            <Link to="/repo">tagraha repo (async demo)</Link>
          </p>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  ticker: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ticker: state.ticker,
});

export default connect(mapStateToProps)(pure(Home));
// export default pure(Home);
