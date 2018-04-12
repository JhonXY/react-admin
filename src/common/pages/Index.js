import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import './style/index.less';

import HasShop from './index/HasShop';
import NoShop from './index/NoShop';

import { getStore } from '../utils/storage';
import { userHasShop } from '../api/users';
class Index extends Component {
  // state = {
    // 从此获取history跳转中传的参数
  //   hasShop: this.props.location.state.query ? true : false, // 是否已有店铺 
  // }
  constructor(props) {
    super(props);
    this.state = {
      hasShop: false, // 是否已有店铺 
    };
  }
  componentWillMount(){
    let storage = getStore('userInfo')
    if(storage) {
      userHasShop({
        id: storage.id
      }).then(res => {
        if(res.data.hasShop){
          this.shopStatus()
        }
      })
    }
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