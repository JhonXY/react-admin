const {
  injectBabelPlugin
} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  // 按需引入
  config = injectBabelPlugin(['import', {
    libraryName: 'antd',
    style: 'css'
  }], config);
  config = injectBabelPlugin(['import', { 
    libraryName: 'antd', 
    style: true 
  }], config);
  // 定制antd组件处
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#1DA57A" },
  }) (config, env);
  return config;
};