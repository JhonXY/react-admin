import React from 'react'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import App from '../App';

// 路由设置存放
const routes = (
  <BrowserRouter
  >
    <Route path="/" component={App} />
  </BrowserRouter>  
)

export default routes;