const {
  injectBabelPlugin
} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireSass = require('react-app-rewire-sass');

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
    // 修改主色调
    modifyVars: { "@primary-color": "#63abec" },
  }) (config, env);

  // 使用scss
  // config = rewireSass(config, env);
  return config;
};