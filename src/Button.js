import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.function}>{this.props.name}</button>
    );
  }
}

export default Button;
