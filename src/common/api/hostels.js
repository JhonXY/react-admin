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

export function getBedtypes(params) {
  return fetch({
    url: '/hostels/getBedtypes',
    method: 'get',
    params
    // params会将参数存到url后
  })
}