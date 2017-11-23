import React, { Component } from 'react';

class HostelOrder extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.submit = this.submit.bind(this)
  }
  submit(){
  }
  render() {
    return (
      <div onClick={this.submit}>click</div>
    );
  }
}

export default HostelOrder;