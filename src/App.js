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
      response: 'Please, wait while connection is established. When it happens, this text changes to "Connected!"',
      bitcoinAddr: '1BwGf3z7n2fHk6NoVJNkV32qwyAYsMhkWf'
    }
  }

  updateBitcoinAddr(event){
    event.preventDefault();
    this.setState({bitcoinAddr: event.target.value});
  }
  
  componentDidMount(){
    this.websocket.onopen = this.onOpen.bind(this);
    this.websocket.onclose = this.onClose.bind(this);
    this.websocket.onerror = this.onError.bind(this);
    this.websocket.onmessage = this.onMessage.bind(this);
  }

  onMessage(evt){
    console.log(evt.data);
    this.setState({ response: evt.data });
  }

  onClose(evt) {
    console.log("disconnected");
    this.setState({ response: "Disconnected! To open websocket again, plese, update the page." });
  }

  onError(evt) {
    console.log("error");
    this.setState({ response: "Error!" });
  }

  onOpen(evt) {
    console.log("connected");
    this.setState({ response: "Connected!" });
  }

  close(){
    this.websocket.close();
  }

  ping(){
    this.doSend("ping");
  }

  subscribeToAllNewTransactions(){
    this.doSend("unconfirmed_sub");
  }

  unsubscribeToAllNewTransactions(){
    this.doSend("unconfirmed_unsub");
  }
  
  subscribeToBlock(){
    this.setState({ response: "You will receive a notification once a new block is found. When it happens, this text changes to a details of found block. " });
    this.doSend("blocks_sub");
  }
  unsubscribeToBlock(){
    this.setState({ response: "You have unsubscribed from a notification." });
    this.doSend("blocks_unsub");
  }
  subscribeToAddress(){
    this.setState({ response: "You have subscribed to a bitcoin address `"+this.state.bitcoinAddr+"`. You will receive notifications for all new bitcoin transactions. When it happens, this text changes to a details of a transaction. " });
    let msg = JSON.stringify({
      "op":"addr_sub","addr":this.state.bitcoinAddr
     });
    this.websocket.send(msg);
  }

  unsubscribeToAddress(){
    this.setState({ response: "You have unsubscribed from a bitcoin address `"+this.state.bitcoinAddr+"`."});
    let msg = JSON.stringify({
      "op":"addr_unsub","addr":this.state.bitcoinAddr
     });
    this.websocket.send(msg);
  }
  doSend(action){
    let msg = JSON.stringify({
      "op":action
     });
    this.websocket.send(msg);
  }

  render() {
    return (
      <div className="container">
        <div className="header">React WebSocket Application</div>
        <div className="block">
          <div className="block">
            <Button name="Disconnect" action={this.close.bind(this)}/>
            <Button name="Ping" action={this.ping.bind(this)}/>
            <Button name="Subscribe to notifications for all new bitcoin transactions" action={this.subscribeToAllNewTransactions.bind(this)}/>
            <Button name="Unsubscribe from new bitcoin transactions" action={this.unsubscribeToAllNewTransactions.bind(this)}/> 
          </div>
          <div className="block">
            <Button name="Receive notifications when a new block is found" action={this.subscribeToBlock.bind(this)}/>
            <Button name="Unsubscribe from notifications when a new block is found" action={this.unsubscribeToBlock.bind(this)}/>
            <Button name="Receive new transactions for a specific bitcoin address" action={this.subscribeToAddress.bind(this)}/>
            <Button name="Unsubscribe from new transactions for a specific bitcoin address" action={this.unsubscribeToAddress.bind(this)}/>
            <p>Type specific bitcoin address:</p>
            <input type="text" 
                ref={((input)=>{this.textInput=input})}
                className="bitcoin-addr"
                placeholder={this.state.bitcoinAddr}
                onChange={this.updateBitcoinAddr.bind(this)}
              /> 
          </div>
        </div>
        <div className="block">
        <p>Response:</p>
            <div id="response">
            {this.state.response}
            </div>
        </div>
      </div>
    );
  }
}

export default App;
