import fetch from '../utils/fetch';
import { getStore } from '../utils/storage';


export function subFoodItem(data) {
  const token = getStore('token')

  return fetch({
    url: '/shops/subFoodItem',
    method: 'post',
    headers: {
      'Authorization': 'Bearer' + token.token
    },
    data
  })
}

export function getFoodItems(params) {
  const token = getStore('token')

  return fetch({
    url: '/shops/getFoodItems',
    method: 'get',
    headers: {
      'Authorization': 'Bearer' + token.token
    },
    params
  })
}

export function delFoodItem(params) {
  const token = getStore('token')

  return fetch({
    url: '/shops/delFoodItem',
    method: 'get',
    headers: {
      'Authorization': 'Bearer' + token.token
    },
    params
  })
}