import React, { Component } from 'react';
import get from 'lodash/get';

const TickerTable = (props) => {
  return (
    <table>
      <tbody>
        <BuyTicker buyPrice={props.tickerPrice.buy}/>
        <SellTicker sellPrice={props.tickerPrice.sell}/>
        <HighTicker highPrice={props.tickerPrice.high}/>
        <LowTicker lowPrice={props.tickerPrice.low}/>
        <OpenTicker openPrice={props.tickerPrice.open}/>
        <CloseTicker closePrice={props.tickerPrice.close}/>
        <ChangeTicker changePrice={props.tickerPrice.change}/>
      </tbody>
    </table>
  )
}

const BuyTicker = (props) => {
  return (
    <tr>
      <td>Buy</td>
      <td>{props.buyPrice}</td>
    </tr>
  )
}

const SellTicker = (props) => {
  return (
    <tr>
      <td>Sell</td>
      <td>{props.sellPrice}</td>
    </tr>
  )
}

const HighTicker = (props) => {
  return (
    <tr>
      <td>High</td>
      <td>{props.highPrice}</td>
    </tr>
  )
}

const LowTicker = (props) => {
  return (
    <tr>
      <td>Low</td>
      <td>{props.lowPrice}</td>
    </tr>
  )
}

const OpenTicker = (props) => {
  return (
    <tr>
      <td>Open</td>
      <td>{props.openPrice}</td>
    </tr>
  )
}

const CloseTicker = (props) => {
  return (
    <tr>
      <td>Close</td>
      <td>{props.closePrice}</td>
    </tr>
  )
}

const ChangeTicker = (props) => {
  return (
    <tr>
      <td>Change</td>
      <td>{props.changePrice}</td>
    </tr>
  )
}

export default TickerTable;