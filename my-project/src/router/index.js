import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import aboutMe from '@/view/aboutMe'
import index from '@/view/index'
import theArticles from '@/view/theArticles'
import searchReasult from '@/view/searchReasult'
import write from '@/view/write'
import adminManage from '@/view/adminManage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: aboutMe
    },
    {
      path: '/theArticles',
      name: 'theArticles',
      component: theArticles
    },
    {
      path: '/searchReasult',
      name: 'searchReasult',
      component: searchReasult
    },
    {
      path: '/write',
      name: 'write',
      component: write
    },
    {
      path: '/adminManage',
      name: 'adminManage',
      component: adminManage
    }
  ]
})
