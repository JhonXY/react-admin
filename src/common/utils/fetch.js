import axios from 'axios'

// 返回一个axios待配置实例
var service = axios.create({
  baseURL: "http://localhost:3000/", // api地址的baseurl，从环境接口配置文件中获取，根据生产环境与开发环境有所不同
  timeout: 5000, // 默认超时处理界限
  // 也可以在此处直接添加header传入的内容
  // headers: {
  //   'X-Token': 'admin'
  // }
})

service.interceptors.request.use(config => {
  // 对即将发送的request请求做相关修改
  // config.headers['X-Token'] = 'admin' // 可在此添加token
  console.log(config)  // for debug
  return config  // 一定要返回
}, error => {
  console.log('reqErr '+ error) // for debug
  return Promise.reject(error) 
  // 跳出该次的axios请求，并返回用于catch或err参数的错误信息
})

service.interceptors.response.use(response => {
  // response提前批量处理错误信息
  const res = response;
  if(res.status !== 200) {
    console.log('请求有误')  // for debug
  } else {
    return response  // 一定要返回
  }
  return response // 测试post时不用验证了，用的别人的接口
}, error => {
  // 请求接受出错
  // 可以配合弹窗来做相关告示
  console.log('resErr ' + error) // for debug
  return Promise.reject(error) // 不返回的话无法接收到错误信息
  // 跳出该次的axios请求，并返回用于catch或err参数的错误信息
})
export default service 
