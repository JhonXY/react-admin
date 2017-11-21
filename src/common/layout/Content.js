import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Breadcrumb, Icon } from 'antd';

import Index from '../pages/Index';
import HostelForm from '../pages/HostelForm';
import FoodForm from '../pages/FoodForm';
import HostelOrder from '../pages/HostelOrder';
import FoodOrder from '../pages/FoodOrder';

const { Content } = Layout;

class Contents extends Component {
  state = {
    path: []
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
          minHeight: 280 }
        }>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <Icon type="home" />
          </Breadcrumb.Item>
          {breads}
        </Breadcrumb>
          <Route exact path="/index" component={Index} />
          <Route path='/form'>
          
            <Switch>
              <Route path='/form/hostelForm' component={HostelForm} />
              <Route path='/form/foodForm' component={FoodForm} />
            </Switch>
          
          </Route>
          <Route path='/order'>
            <Switch>
              <Route path='/order/hostelOrder/:id' component={HostelOrder} />
              <Route path='/order/foodOrder' component={FoodOrder} />
            </Switch>
          </Route>
      </Content>
    );
  }
}

export default Contents;