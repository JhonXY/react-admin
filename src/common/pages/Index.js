import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Index extends Component {
  state = {  }
  render() {
    return (
      <div>Index
        <Link to='/'>123</Link>
      </div>
    );
  }
}

export default Index;