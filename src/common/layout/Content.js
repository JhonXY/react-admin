import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Breadcrumb, Icon } from 'antd';

// import { connect } from 'react-redux'

import Index from '../pages/Index';
import HostelForm from '../pages/HostelForm';
import FoodForm from '../pages/FoodForm';
import FoodFormChange from '../pages/FoodFormChange';
import FoodFormNew from '../pages/FoodFormNew';
import HostelOrder from '../pages/HostelOrder';
import FoodOrder from '../pages/FoodOrder';
// import OrderTable from '../pages/OrderTable';

const { Content } = Layout;

class Contents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: []
    }
  }
  componentDidMount(){

  }

  render() {
    // 有待改善
    let arr = window.location.pathname.split('/');
    arr.shift();
    
    let breads = arr.map((item, index, arr) => {
      if(item === 'app'){
        return (
          <Breadcrumb.Item
            key={index}>
            <Link to="/app/index">{item}</Link>
          </Breadcrumb.Item>
        )
      } else {
        let link = '';
        for (let i = 0; i <= index; i++) {
          link = link + '/' + arr[i]
        }
        return (
          <Breadcrumb.Item
            key={index}>
            <Link to={link}>{item}</Link>
          </Breadcrumb.Item>
        )
      }
    })

    return (
      <Content 
        style={
        { margin: '24px 16px', 
          padding: 24,
          marginBottom: 0, 
          background: '#fff', 
          minHeight: 500,
          overflowY: 'auto',
          minWidth: 1071}
        }>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/app/index">
              <Icon type="home" />
            </Link>
          </Breadcrumb.Item>
          {breads}
        </Breadcrumb>
        <Switch>
          <Route path="/app/index" component={Index} />
          <Route path='/app/hostelForm' component={HostelForm} />
          {/* 为了子路由的匹配成功，子路由一定要写在父路由的前面 */}
          <Route path='/app/foodForm/change' component={FoodFormChange} />
          <Route path='/app/foodForm/new' component={FoodFormNew} />
          <Route path='/app/foodForm' component={FoodForm} />
          <Route path='/app/hostelOrder/:id' component={HostelOrder} />
          <Route path='/app/foodOrder' component={FoodOrder} />
          {/* <Route path='/app/orderTable' component={orderTable} /> */}
        </Switch>
      </Content>
    );
  }
}

export default Contents;