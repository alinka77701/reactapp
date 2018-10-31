import React, { Component } from 'react';
import './App.css';

var wsUri = "wss://ws.blockchain.info/inv";

class App extends Component {

  constructor(props){
    
    super(props);
    this.state={
      websocket : new WebSocket(wsUri),
      response: ' '
    }
  }

  handleKeyPress=(event)=>{
    if(event.key=='Enter'){

    }
  }
  send(str){
    let msg = JSON.stringify({
      str
     });
    // writeToScreen("CONNECTED");
    this.websocket.send(msg);
  }
  connect(){
    console.log("connecting");
    this.testWebSocket();
  }

  testWebSocket() {
    console.log("text");
    
    this.state.websocket.onopen = function (evt) { this.onOpen() };
    this.state.websocket.onclose = function(evt) { this.onClose(evt)};
    this.state.websocket.onmessage = function(evt) { this.onMessage(evt) };
    this.state.websocket.onerror = function (evt) { this.onError(evt)};
    this.onOpen();
  }

  onOpen() {
    let msg = JSON.stringify({
     "op":"unconfirmed_sub"
    });
  
   this.state.websocket.send(msg);
    console.log("send");
  }
  
   onClose(evt) {
  //  writeToScreen("DISCONNECTED");
  }

   onMessage(evt) {
     console.log(evt.data);
   // websocket.close();
  }

   onError(evt) {
    console.log("error");
  }

 
  render() {
    return (
      <div className="container">
        <div className="header">React WebSocket Application</div>
        <div className="block">
          <div className="block">
            <button onClick={this.connect.bind(this)}>Connect</button>
            <button >Ping </button>
            <button >Subscribe to notifications for all new bitcoin transactions </button>
            <button >Unsubscribe from new  bitcoin transactions </button>
          </div>
          <div className="block">
            <button >Receive notifications when a new block is found</button>
            <button >Unsubscribe from notifications when a new block is found</button>
            <button> Receive new transactions for a specific bitcoin address</button>
            <button>Unsubscribe from new transactions for a specific bitcoin address</button>
            <p>Type specific bitcoin address:</p>
            <input type="text" 
                ref={((input)=>{this.textInput=input})}
                className="bitcoin-addr"
                onKeyPress={this.handleKeyPress.bind(this)}
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
