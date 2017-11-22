import React, { Component } from 'react';

class HostelOrder extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.submit = this.submit.bind(this)
  }
  submit(){
    console.log('====================================');
    console.log(this);
    console.log('====================================');
  }
  render() {
    return (
      <div onClick={this.submit}>click</div>
    );
  }
}

export default HostelOrder;