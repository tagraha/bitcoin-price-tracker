import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pure from 'recompose/pure';
import Helmet from 'react-helmet';
import './index.css';

let ws;
class Home extends Component {
  constructor(props) {
    super(props);
    this.handleWebsocket = this.handleWebsocket.bind(this);
    this.openSocket = this.openSocket.bind(this);
    this.signalReceived = this.signalReceived.bind(this);
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
      console.log(data);
    };
  }

  signalReceived(data) {
    console.log(data);
  }

  componentWillUnmount() {
    ws.close();
  }

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
      </div>
    );
  }
}

export default Home;
