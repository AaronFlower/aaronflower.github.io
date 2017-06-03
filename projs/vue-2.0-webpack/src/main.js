import Vue from 'vue'
import App from './App'

/**
 * 引入 jQuery 及 相关 jQuery 插件。
 */
// var $ = require('jquery')
// require('jquery-mousewheel')
// require('malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css')
// require('malihu-custom-scrollbar-plugin')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
/* global $:true */
console.log('Hello global true')
console.log('$', $)
