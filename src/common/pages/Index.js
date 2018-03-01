import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import './style/index.less';

import HasShop from './index/HasShop';
import NoShop from './index/NoShop';

class Index extends Component {
  state = {
    hasShop: false, // 是否已有店铺 
  }

  render() {
    let indexContent = () => {
      return (
        this.state.hasShop
          ? <HasShop loginSuc={this.loginSuccess} />
          : <NoShop tologin={this.toggleActive} />
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