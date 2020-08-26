import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import News from '@/views/News'
import Consult from '@/views/Consult'
import Report from '@/views/Report'
import Identify from '@/views/Identify'
import Profile from '@/views/Profile'
import Settings from '@/views/Settings'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/consult',
      name: 'consult',
      component: Consult
    },{
      path: '/news',
      name: 'news',
      component: News
    },{
      path: '/identify',
      name: 'identify',
      component: Identify
    },{
      path: '/report/',
      name: 'report',
      component: Report
    },{
      path: '/report/:ficheName',
      name: 'report',
      component: Report
    },{
      path: '/profile',
      name: 'profile',
      component: Profile
    },{
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})