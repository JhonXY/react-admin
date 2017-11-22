import React from 'react';
import {
  Router,
  Route,
  BrowserRouter
} from 'react-router-dom'
import App from '../App';
import { Provider } from 'react-redux';
import store from '../redux/store';

// 路由设置存放
const routes = (
  <Provider store={store}>
    <BrowserRouter>
      <Route exac path="/" component={App} />
    </BrowserRouter>
  </Provider>  
)

export default routes;