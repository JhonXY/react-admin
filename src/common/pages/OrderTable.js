import React, { Component } from 'react';
import { Table } from 'antd';
import { getStore } from '../utils/storage';
// import socket from '../api/socket';
import { getAllOrder } from '../api/orders';
import axios from 'axios'
class OrderTable extends Component {
  state = {
    shop: null
  }
  componentWillMount() {
    const shop = getStore('shopInfo')
    this.setState({
      shop
    })
    console.log('here');
    getAllOrder(shop.id, -1).then(res => {
      console.log(res);
    })
  }
  render() {
    return (
      <div>foodOrder</div>
    );
  }
}

export default OrderTable;