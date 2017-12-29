import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter,
} from 'react-router-dom'
import App from '../App';
import Login from '../pages/Login';
import { Provider } from 'react-redux';
import store from '../redux/store';

// 路由设置存放
const routes = (
  <Provider store={store}>
    <BrowserRouter>
      <div style={{width: '100%', height: '100%'}}>
      <Redirect from="/" to="/login" />
      <Route path="/app" component={App} />
      <Route path="/login" component={Login} />
      </div>
    </BrowserRouter>
  </Provider>  
)

export default routes;