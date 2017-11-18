import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { Layout, Breadcrumb, Icon } from 'antd';

import Index from '../pages/Index';
import HostelForm from '../pages/HostelForm';
import FoodForm from '../pages/FoodForm';
import HostelOrder from '../pages/HostelOrder';
import FoodOrder from '../pages/FoodOrder';

const { Content } = Layout;

class Contents extends Component {
  state = {

  }
  render() {
    return (
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <Icon type="user" />
            <span></span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Application
          </Breadcrumb.Item>
        </Breadcrumb>
          <Route path="/index" component={Index} />
          <Route path='/form'>
            <Switch>
              <Route path='/form/hostelForm' component={HostelForm} />
              <Route path='/form/foodForm' component={FoodForm} />
            </Switch>
          </Route>
          <Route path='/order'>
            <Switch>
              <Route path='/order/hostelOrder' component={HostelOrder} />
              <Route path='/order/foodOrder' components={FoodOrder} />
            </Switch>
          </Route>
      </Content>
    );
  }
}

export default Contents;