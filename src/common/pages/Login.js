import React, { Component } from 'react';
// import { message } from 'antd';
// import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style/login.less';
import ForLogin from './ForLogin';
import ForRegister from './ForRegister';
// 如需要手动跳转，需使用高阶组件，通过withRouter传入history
// import { withRouter } from "react-router-dom"; 
import { setStore } from '../utils/storage';

class Login extends Component {
  state = { 
    logining: true 
  }

  // 切换登录头
  toggleActive = () => {
    this.setState({ logining : !this.state.logining})
  }

  // 登录后跳转
  loginSuccess = (query) => {
    setStore('shopInfo', query) 
    this.props.history.push("/app/index", { query });
  }

  render() {
    // 可切换的登录与注册表单
    const taps = () => {
      return (
        this.state.logining
          ? <div className='login-form-wrap'>
              <ForLogin loginSuc={this.loginSuccess} />
            </div>   
          : <div className='login-form-wrap'>
              <ForRegister tologin={this.toggleActive} />
            </div>
      )
    }

    return (
      <div id="login">
        <div className="login-wrap">
          <header className="login-toggle">
            {/* 下方小横条 */}
            <div className={this.state.logining ? "bottom-line" : "bottom-line reg"}></div>
            <div className="toggle-login" onClick={this.toggleActive}>
              登 录
            </div>
            <div className="toggle-register" onClick={this.toggleActive}>
              注 册
            </div>
          </header>
          <section>
            <div className="form-wrap">
              {taps()}
            </div>
          </section>
        </div>
      </div> 
    );
  }
}

// export default withRouter(Login);
export default Login;