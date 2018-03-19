import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import './style/index.less';

import HasShop from './index/HasShop';
import NoShop from './index/NoShop';

import { getStore } from '../utils/storage';
class Index extends Component {
  // state = {
    // 从此获取history跳转中传的参数
  //   hasShop: this.props.location.state.query ? true : false, // 是否已有店铺 
  // }
  constructor(props) {
    super(props);
    this.state = {
      hasShop: this.props.location.state.query ? true : false, // 是否已有店铺 
      // hasShop: () => {
      //   this.props.location.state.query ? true : false, // 是否已有店铺
      // }
    };
  }

  shopStatus = () => {
    this.setState({
      hasShop: !this.state.hasShop
    })
  }
  render() {
    const indexContent = () => {
      return (
        this.state.hasShop
          ? <HasShop />
          : <NoShop hasNow={this.shopStatus} />
      )
    }
    return (
      <div>
        {indexContent()}
      </div>
    );
  }
}

export default Index;