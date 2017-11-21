import React, { Component } from 'react';
import { Row, Col } from 'antd';
// import { Form, Radio, Input, Button } from 'antd';

class FoodForm extends Component {
  state = { 
    disabled: true, 
  }
  render() {
    return (
      <div>
        <Row type="flex" justify="space-around">
          <Col xs={24} sm={24} md={11} lg={10} xl={8} >
          表单提交处
          </Col>
          <Col xs={0} sm={0} md={11} lg={12} xl={13} >表格显示处</Col>
        </Row>
      </div>
    );
  }
}

export default FoodForm;