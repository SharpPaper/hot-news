// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Axios from 'axios'
import VerticalPull from '@/components/VerticalPull'
import iFrameResize from 'iframe-resizer/js/iframeResizer'

Vue.directive('resize',{
  bind: function(el,{value = {}}){
    el.addEventListener('load',()=>{iFrameResize(value,el)})
  }
})
import {Loading} from 'element-ui'
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$ajax = Axios.create({
  baseURL:'https://47.111.85.187:8011/',
  timeout:6000,
});

Vue.use(VerticalPull);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
