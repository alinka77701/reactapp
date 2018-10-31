import React, { Component } from 'react';
import './App.css';
import './Button.js';
import Button from './Button.js';
var wsUri = "wss://ws.blockchain.info/inv";

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      websocket : new WebSocket(wsUri),
      response: ' ',
      bitcoinAddr: ' '
    }
  }

  updateBitcoinAddr(bitcoinAddr){
    this.setState({bitcoinAddr: bitcoinAddr.target.value})
  }

  initWebSocket(evt) {
    console.log("connecting...");
    this.state.websocket.onopen = function (evt) { this.onOpen() };
    this.state.websocket.onclose = function(evt) { this.onClose(evt)};
    this.state.websocket.onmessage = function(evt) { this.onMessage(evt) };
    this.state.websocket.onerror = function (evt) { this.onError(evt)};
    console.log("connected");
  }

  onOpen() {
  
  }
  
   onClose(evt) {
    console.log("disconnected");
  }

   onMessage(evt) {
     console.log(evt.data);
  }

   onError(evt) {
    console.log("error");
  }

  ping() {
     let msg = JSON.stringify({
     "op":"ping"
    });
   this.state.websocket.send(msg);
  }
 
  render() {
    return (
      <div className="container">
        <div className="header">React WebSocket Application</div>
        <div className="block">
          <div className="block">
            <Button name="Connect" function={this.initWebSocket.bind(this)}/>
            <Button name="Ping" function={this.ping.bind(this)}/>
            <Button name="Subscribe to notifications for all new bitcoin transactions"/>
            <Button name="Unsubscribe from new  bitcoin transactions"/>
          </div>
          <div className="block">
            <Button name="Receive notifications when a new block is found"/>
            <Button name="Unsubscribe from notifications when a new block is found"/>
            <Button name="Receive new transactions for a specific bitcoin address"/>
            <Button name="Unsubscribe from new transactions for a specific bitcoin address"/>
            <p>Type specific bitcoin address:</p>
            <input type="text" 
                ref={((input)=>{this.textInput=input})}
                className="bitcoin-addr"
                value={this.state.bitcoinAddr}
                onChangeText={bitcoinAddr=>this.updateBitcoinAddr(bitcoinAddr)}
              /> 
          </div>
        </div>
        <div className="block">
          <div id="consoleLog">
            <p id="message">Console log</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
