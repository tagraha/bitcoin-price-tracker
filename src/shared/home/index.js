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
    this.state = {
      connectionState: 'off'
    }
    this.openSocket = this.openSocket.bind(this);
    this.handleBtcChange = this.handleBtcChange.bind(this);
    this.updateUserMoney = this.updateUserMoney.bind(this);
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
      // alert("websocket connection error");
      console.log('websocket connection closed');
    }

    // listen to onmessage event
    ws.onmessage = evt => { 
      const data = JSON.parse(evt.data);
      const { converter, ticker, dispatch } = this.props;
      this.updateUserMoney(data, () => {
        dispatch(convertBtc(converter.inputText, ticker.buy));
      })
    };
  }

  handleBtcChange(ev) {
    const { dispatch, ticker } = this.props;
    const input = ev.target.value;
    dispatch(handleInputChange(input));

    const isNumber = !isNaN(input);
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      if (isNumber) {
        dispatch(convertBtc(input, ticker.buy));
      }
    }, 100); // debounce input for 100ms
  }

  updateUserMoney(data, cb) {
    const { dispatch } = this.props;
    this.props.dispatch(tickerUpdate(data));

    if (cb) {
      cb();
    }
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
              placeholder="insert BTC ammount. e.g: 0.02"
              onChange={this.handleBtcChange}
              value={converter.inputText}
            /> <br/>
            <small>*we're using buy price to calculate the conversion</small>
            {!isNaN(converter.userMoney) &&
              <h3>USD&nbsp;{converter.userMoney}</h3>
            }
          </div>

          <div className="column">
            <small>websocket connection: {}</small>
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
