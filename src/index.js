import ReactDOM from 'react-dom';
import './index.scss';
import routes from './common/router/router';
import registerServiceWorker from './registerServiceWorker';

// 入口文件
// 路由统一渲染处
ReactDOM.render(
  routes, 
  document.getElementById('root')
);
registerServiceWorker();
