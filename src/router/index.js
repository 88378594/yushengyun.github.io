import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/Index'
import Login from '../components/login/Login'
import Reg from '../components/reg/Reg'
import CateChild from '../components/cate/CateChild'
import FeatCateChild from '../components/cate/FeatCateChild'

import Collection from '../components/Collection/Collection.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg,
    },
    {
      path: '/cateChild/:id',
      name: 'CateChild',
      component: CateChild,
    },
    {
      path: '/featCateChild/:id',
      name: 'FeatCateChild',
      component: FeatCateChild,
    },
    {
      path: '/collection',
      name: 'Collection',
      component: Collection,
    }
  ]
})
