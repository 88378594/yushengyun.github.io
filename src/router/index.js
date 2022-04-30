import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/Index'
import Login from '../components/login/Login'
import Reg from '../components/reg/Reg'
import CateChild from '../components/cate/CateChild'

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
    }
  ]
})
