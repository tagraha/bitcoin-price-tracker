import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import pure from 'recompose/pure';
import Helmet from 'react-helmet';
import get from 'lodash/get';

import { tickerUpdate } from './../../../redux/ticker';
import { handleInputChange, convertBtc } from './../../../redux/converter';

import TickerTable from './../../component/TickerTable/TickerTable';

import './index.css';

let ws;
let debounce;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionState: false,
      moneyColor: 'green'
    }
    this.openSocket = this.openSocket.bind(this);
    this.handleBtcChange = this.handleBtcChange.bind(this);
    this.updateUserMoney = this.updateUserMoney.bind(this);
    this.closeConnection = this.closeConnection.bind(this);
  }

  componentDidMount() {
    this.openSocket();
  }

  componentWillReceiveProps(nextProps) {
    const { converter } = this.props;
    if (nextProps.converter.fullDecimal > converter.fullDecimal) {
      this.setState({ moneyColor: 'green' });
    } else {
      this.setState({ moneyColor: 'red' });
    }
  }

  openSocket() {
    ws = new WebSocket('wss://real.okcoin.com:10440/websocket');

    ws.onopen = () => {
      this.setState({ connectionState: true });
      ws.send(JSON.stringify({'event':'addChannel','channel':'ok_sub_spot_btc_usd_ticker'}));
    }

    ws.onerror = () => {
      // alert("websocket connection error");
      console.log('websocket connection closed');
      this.setState({ connectionState: false });
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

  closeConnection() {
    ws.close()
  }

  componentWillUnmount() {
    this.closeConnection();
  }

  render() {
    const { converter, ticker } = this.props;
    const { connectionState } = this.state;
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
            <label for="btcinput" style={{ fontSize: 12, }}>Enter BTC</label>
            <input
              id="btcinput"
              type="text"
              placeholder="insert BTC ammount. e.g: 0.02"
              onChange={this.handleBtcChange}
              value={converter.inputText}
            /> <br/>
            <small>*we're using buy price to calculate the conversion</small>
            {!isNaN(converter.userMoney) &&
              <h3 style={{ color: this.state.moneyColor }}>USD&nbsp;{`${converter.userMoney}`}<small>.{converter.decPart}</small></h3>
            }
          </div>

          <div className="column">
            <small className="clearfix">
              websocket connection: {connectionState ? <ConnectionOn /> : <ConnectionOff />}
              <div className="float-right">
                <button
                  onClick={this.openSocket} 
                  className="button button-outline"
                  style={smallButton}
                  disabled={connectionState}
                >open</button>
                <button onClick={this.closeConnection} disabled={!connectionState} className="button" style={smallButton}>close</button>
              </div>
            </small>

            <TickerTable tickerPrice={ticker} />
            
            <NavLink to="/about">about the author</NavLink>
            <br/>
            <small>open your console, we're using redux logger</small>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectionOn = () => {
  return (
    <small style={blue}>on</small>
  )
}

const ConnectionOff = () => {
  return (
    <small style={red}>off</small>
  )
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

const smallButton = {
  fontSize: '.8rem',
  height: '2.8rem',
  lineHeight: '2.8rem',
  padding: '0 1.5rem',
  marginLeft: 6
}

const blue = {
  color: '#0b07ea',
  fontWeight: 'bold'
}

const red = {
  color: 'red',
  fontWeight: 'bold'
}

export default connect(mapStateToProps)(pure(Home));
// export default pure(Home);
