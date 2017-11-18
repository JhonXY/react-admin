import React, { Component } from 'react';
// import { Button } from 'antd';
import { Layout } from 'antd';
import './app.scss';

import Sider from './layout/Sider';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Content from './layout/Content';

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Sider collapsed={this.state.collapsed} />
          <Layout>
            <Header 
              style={{ background: '#fff', padding: 0 }}
              collapsed={this.state.collapsed}
              toggle={this.toggle } />
            <Content />
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
