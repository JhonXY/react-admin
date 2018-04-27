import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import HeaderBarR from './HeaderBar'
import socket from '../api/socket'
import { setStore } from '../utils/storage';
const { Header } = Layout;



class HeaderBar extends Component {
  state = {
    newNum: 0
  }

  
  componentDidMount() {
    // 登入socket
    socket.on('login', (res) => {
      console.log('login socket');
      setStore('socket', res)
    })

    socket.on('newOrder', (res) => {
      console.log('get newOrder');
      this.setState({
        newNum: this.state.newNum+=1
      }, ()=>{
      })
    })
  }
  
  render() {
    return (
      <Header style={{ 
        background: '#fff', 
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
        }}
      >
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        <HeaderBarR newOrder={this.state.newNum} style={{float: 'right'}}></HeaderBarR>
      </Header>
    );
  }
}

export default HeaderBar;