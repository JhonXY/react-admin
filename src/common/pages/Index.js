import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import './style/index.less';

import HasShop from './index/HasShop';
import NoShop from './index/NoShop';

import { getStore, setStore } from '../utils/storage';
import { userHasShop } from '../api/users';
class Index extends Component {
  // state = {
    // 从此获取history跳转中传的参数
  //   hasShop: this.props.location.state.query ? true : false, // 是否已有店铺 
  // }
  constructor(props) {
    super(props);
    this.state = {
      hasShop: null, // 是否已有店铺 
    };
  }
  componentDidMount(){
    let storage = getStore('userInfo')
    // 存在用户信息时查找是否有店铺
    storage && userHasShop({
      id: storage.id
    }).then(res => {
      res.data.code && this.shopStatus(res.data.hasShop)
    })
  }
  shopStatus = (res) => {
    this.setState({
      hasShop: res
    })
  }
  render() {
    const indexContent = () => {
      if (this.state.hasShop !== null){
        return (
          this.state.hasShop
            ? <HasShop />
            : <NoShop hasNow={this.shopStatus} />
        )
      } else {
        return
      }
    }
    return (
      <div>
        {indexContent()}
      </div>
    );
  }
}

export default Index;