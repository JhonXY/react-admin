import fetch from '../utils/fetch';
import { getStore } from '../utils/storage';

// 录入床型
export function addBedtype(data) {
  return fetch({
    url: '/hostels/addBedtype',
    method: 'post',
    data
  })
}

// 录入床型
export function subHostel(data) {
  const token = getStore('token')

  return fetch({
    url: '/shops/subHostels',
    method: 'post',
    headers: {
      'Authorization': 'Bearer' + token.token
    },
    data
  })
}

export function getHotels(params) {
  const token = getStore('token')

  return fetch({
    url: '/shops/getHotels',
    method: 'get',
    headers: {
      'Authorization': 'Bearer' + token.token
    },
    params
    // params会将参数存到url后
  })
}