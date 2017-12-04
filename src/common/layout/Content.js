import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Breadcrumb, Icon } from 'antd';

import { connect } from 'react-redux'

import Index from '../pages/Index';
import HostelForm from '../pages/HostelForm';
import FoodForm from '../pages/FoodForm';
import FoodFormChange from '../pages/FoodFormChange';
import FoodFormNew from '../pages/FoodFormNew';
import HostelOrder from '../pages/HostelOrder';
import FoodOrder from '../pages/FoodOrder';

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
    let arr = window.location.pathname.split('/');
    arr.shift();
    let breads = arr.map((item, index, arr) => {
      let link = '';
      for(let i=0; i<=index; i++) {
        link = link+'/'+arr[i]
      }
      return (
        <Breadcrumb.Item 
        key={index}>
          <Link to={link}>{item}</Link>
        </Breadcrumb.Item>
      )
    })

    return (
      <Content 
        style={
        { margin: '24px 16px', 
          padding: 24, 
          background: '#fff', 
          minHeight: 300,
          overflowY: 'scroll',
          overflowX: 'scroll',
          minWidth: 1071}
        }>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <Icon type="home" />
          </Breadcrumb.Item>
          {breads}
        </Breadcrumb>
        <Switch>
          <Route exact path="/app" component={Index} />
          <Route path='/app/form/hostelForm' component={HostelForm} />
          <Route path='/app/form/foodForm' component={FoodForm} />
          <Route path='/app/form/foodForm/change' component={FoodFormChange} />
          <Route path='/app/form/foodForm/new' component={FoodFormNew} />
          <Route path='/app/order/hostelOrder/:id' component={HostelOrder} />
          <Route path='/app/order/foodOrder' component={FoodOrder} />
        </Switch>
      </Content>
    );
  }
}

export default Contents;