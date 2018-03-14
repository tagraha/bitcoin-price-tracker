import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import pure from 'recompose/pure';
import Helmet from 'react-helmet';
import get from 'lodash/get';

import { tickerUpdate } from './../../../redux/ticker';
import { handleInputChange, convertBtc } from './../../../redux/converter';

import './index.css';

let ws;
let debounce;
class Home extends Component {
  constructor(props) {
    super(props);
    this.openSocket = this.openSocket.bind(this);
    this.handleBtcChange = this.handleBtcChange.bind(this);
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

  handleBtcChange(ev) {
    ws.close();
    const { dispatch } = this.props;
    const input = ev.target.value;
    dispatch(handleInputChange(input));

    clearTimeout(debounce);
    debounce = setTimeout(() => {

    }, 750); // debounce input for 150ms
  }

  componentWillUnmount() {
    ws.close();
  }

  render() {
    const { converter, ticker } = this.props;
    return (
      <div id="homePage">
        <Helmet
          title="Glints - BTCUSD converter"
        />

        <div className="row">
          <div className="column">
            <h1>
              BTC price ticker
            </h1>
            <div className="header">
              <strong>websocket connection wss://real.okcoin.com:10440/websocket</strong>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: 24 }}>
          <div className="column">
            <input
              type="text"
              placeholder="insert BTC ammount"
              onChange={this.handleBtcChange}
              value={converter.inputText}
            />
          </div>

          <div className="column">
            <table>
              <tbody>
                <tr>
                  <td>Buy</td>
                  <td>{ticker.buy}</td>
                </tr>
                <tr>
                  <td>Sell</td>
                  <td>{ticker.sell}</td>
                </tr>
                <tr>
                  <td>high</td>
                  <td>{ticker.high}</td>
                </tr>
                <tr>
                  <td>low</td>
                  <td>{ticker.low}</td>
                </tr>
                <tr>
                  <td>open</td>
                  <td>{ticker.open}</td>
                </tr>
                <tr>
                  <td>close</td>
                  <td>{ticker.close}</td>
                </tr>
                <tr>
                  <td>change</td>
                  <td>{ticker.change}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  ticker: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  converter: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ticker: state.ticker,
  converter: state.converter
});

export default connect(mapStateToProps)(pure(Home));
// export default pure(Home);
