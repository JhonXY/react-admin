import fetch from '../utils/fetch';
import { getStore } from '../utils/storage';

// 登录
export function login(params){
  return fetch({
    url: '/users/login',
    method: 'get',
    params 
    // params会将参数存到url后
  })
}

// 注册
export function register(data) {
  return fetch({
    url: '/users/register',
    method: 'post',
    data
  })
}

// 测试
export function userInfo(data) {
  const token = getStore('token')
  return fetch({
    url: '/users/login',
    method: 'get',
    headers: {
      'Authorization': 'Bearer'+token
    },
    data
  })
}