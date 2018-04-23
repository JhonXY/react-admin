import React, { Component } from 'react';
import socket from '../api/socket';
class FoodOrder extends Component {
  state = {  }

  componentWillMount() {
    socket.on('', {

    })
  }

  render() {
    return (
      <div>foodOrder</div>
    );
  }
}

export default FoodOrder;