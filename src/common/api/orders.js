import fetch from '../utils/fetch';
import { getStore } from '../utils/storage';

// 读取hotel订单
// 0 待付 1 已付 2 已完成 3 已退款
export function getAllOrder(id, status) {
  const token = getStore('token')
  return fetch({
    url: '/orders/getAllOrder',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token.token
    },
    params: {
      shopId: id,
      status
    }
  })
}