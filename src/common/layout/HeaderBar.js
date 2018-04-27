import React, { Component } from 'react'
import { Popover, Icon } from 'antd';
import { withRouter } from "react-router-dom"; 
class HeaderBarR extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      newNum: this.props.newOrder
    }
  }

  componentDidMount() {
    console.log(this.props);
  }
  
  loginOut = ()=> {
    this.props.history.push("/");
  }

  render() { 
    const userContent = (
      <div>
        <p onClick={this.loginOut} style={{ cursor: 'pointer' }}>退出登录</p>
      </div>
    )

    return ( 
      <ul className="barRList">
        <li></li>
        <li style={{ position: 'relative'}}>
          <span 
            style={{ 
              fontSize: 20,
              display: 'inline-block',
              lineHeight: '25px'
            }} 
            className={this.props.newOrder > 0 ? "iconfont icon-notice bell" : "iconfont icon-notice"}>
          </span>
          {
            this.props.newOrder > 0 ? <span className="num">{this.props.newOrder}</span>: ''
          }
        </li>
        <li>
          <Popover arrowPointAtCenter content={userContent} trigger="hover">
            <Icon style={{ fontSize: '24px', marginTop: '22px' }} type="user" />
          </Popover>
        </li>
      </ul>
     )
  }
}
 
export default withRouter(HeaderBarR);