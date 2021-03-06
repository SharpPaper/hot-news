import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NewsItem from '@/components/NewsItem'
import NewsList from '@/components/NewsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewsList',
      component: NewsList,
      meta:{
        keepAlive:true,
      }
    },
    {
      path: '/NewsItem',
      name: 'NewsItem',
      component: NewsItem
    }
  ]
})
