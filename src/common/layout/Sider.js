import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderBar extends Component {
  state = { 
  }
  render() {
    return (
      <Sider
        // 自定义触发隐藏默认设定
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        // style={{ height: 100% }}
      >
        <div className="logo">管理系统</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to='/app/index'>
              <Icon type="upload" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu 
            key="sub1" 
            title={
              <span>
                <Icon type="mail" />
                <span>
                  信息录入
                </span>
              </span>
            }>
            <Menu.Item key="2"><Link to='/app/hostelForm'>床位相关</Link></Menu.Item>
            <Menu.Item key="3"><Link to='/app/foodForm'>菜单相关</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="mail" />
                <span>
                  订单处理
              </span>
              </span>
            }>
            <Menu.Item key="4"><Link to='/app/orderTable'>查看订单</Link></Menu.Item>
            {/* <Menu.Item key="5"><Link to='/app/foodOrder'>菜单相关</Link></Menu.Item> */}
          </SubMenu>
          <Menu.Item key="6">
            <Icon type="upload" />
            <span>简介</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderBar;