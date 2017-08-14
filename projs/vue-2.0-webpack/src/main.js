import Vue from 'vue'
import App from './App'
import Tip from './components/tooltip/tip.vue'

/**
 * 引入 jQuery 及 相关 jQuery 插件。
 */
// var $ = require('jquery')
// require('jquery-mousewheel')
// require('malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css')
// require('malihu-custom-scrollbar-plugin')

/* eslint-disable no-new */
Vue.component('Tip', Tip)
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
