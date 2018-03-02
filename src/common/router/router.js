import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter,
  Switch
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
        <Switch>
          <Route path="/app" component={App} />
          <Route path="/login" component={Login} />
          {/* 重定向一定要写在重定向的路由后面 */}
          <Redirect from="/" to="/login" />
          {/*404的Route则放到最后*/}
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>  
)

export default routes;