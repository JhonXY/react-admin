import ReactDOM from 'react-dom';
import './index.less';
import routes from './common/router/router';
import registerServiceWorker from './registerServiceWorker';
// import socket from './common/api/socket'

// socket.on('login', (res) => {
//   console.log('login socket');
//   console.log(res);
// })

// // 触发后端路由
// socket.emit('getNewOrder',{}, (res) => {
//   console.log(res);
// });
// 入口文件
// 路由统一渲染处
ReactDOM.render(
  routes, 
  document.getElementById('root')
);
registerServiceWorker();
