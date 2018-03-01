import React, { Component } from 'react';

import { Steps, Button, message } from 'antd';
const Step = Steps.Step;

class NoShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next = () => {
    let current = this.state.current + 1
    this.setState({ current })
  }

  prev = () => {
    let current = this.state.current - 1
    this.setState({ current })
  }

  done = () => {
    let current = this.state.current - 1
    this.setState({ current })
  }

  render() {
    const { current } = this.state

    return (
      <div className="mt-15 no-shop">
        <Steps current={current}>
          <Step title="" description="" />
          <Step title="" description="" />
          <Step title="" description="" />
        </Steps>
        <div className="steps-content"></div>
        <div className="steps-actions">
          { 
            current > 0
            &&
            <Button onClick={() =>this.prev()}>上一步</Button>   
          }
          {
            current != 2
            &&
            <Button onClick={() =>this.next()}>下一步</Button>
          }
          {
            current === 2
            &&
            <Button onClick={() =>this.done()}>完成</Button>
          }         
        </div>
      </div>
    )
  }
}

export default NoShop;