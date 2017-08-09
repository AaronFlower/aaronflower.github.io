// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
const publicPath = path.resolve(__dirname, '../../../public/vue2.0-demo')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: 'index.html',
    assetsRoot: publicPath,
    assetsSubDirectory: 'static',
    //  assetsPublicPath 是编译 index.html 时静态资源注入的目录， 以 "/" 开头表示从项目的当前目录开始查找，不以 "/" 开始则从当前目录开始查找。
    assetsPublicPath: '/public/vue2.0-demo',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
