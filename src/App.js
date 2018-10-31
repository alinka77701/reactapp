import React, { Component } from 'react';
import './App.css';
import './Button.js';
import Button from './Button.js';
const wsUri = "wss://ws.blockchain.info/inv";

class App extends Component {

  constructor(props){
    super(props);
    this.websocket=new WebSocket(wsUri);
    this.state={
      response: ' ',
      bitcoinAddr: ' '
    }
  }

  updateBitcoinAddr(bitcoinAddr){
    this.setState({bitcoinAddr: bitcoinAddr.target.value});
  
  }

  initWebSocket(evt) {
    console.log("connecting...");
    this.websocket.onopen = function (evt) { console.log("connected"); };
    this.websocket.onclose = function(evt) {  console.log("disconnected");};
    this.websocket.onmessage = function(evt) { 
      console.log(evt.data);
      this.setState({ response: evt.data });
    };
    this.websocket.onerror = function (evt) { console.log("error");};
    console.log("connected");
  }

  ping() {
     let msg = JSON.stringify({
     "op":"ping"
    });
   this.websocket.send(msg);
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
         
            <input id="response" readOnly="true"/>
         
        </div>
      </div>
    );
  }
}

export default App;
