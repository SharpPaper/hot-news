// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import VerticalPull from '@/components/VerticalPull'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$ajax = Axios.create({
  baseURL:'http://47.111.85.187:8011/',
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
