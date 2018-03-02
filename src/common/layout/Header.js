import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { HeaderBarR } from './HeaderBar'

const { Header } = Layout;

class HeaderBar extends Component {
  state = {

  }
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        <HeaderBarR></HeaderBarR>
      </Header>
    );
  }
}

export default HeaderBar;