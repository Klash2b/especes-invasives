import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import News from '@/views/News'
import Consult from '@/views/Consult'
import Report from '@/views/Report'
import Identify from '@/views/Identify'
import Profile from '@/views/Profile'
import Settings from '@/views/Settings'
import TestDB from '@/views/TestDB'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/consult',
      name: 'Consult',
      component: Consult
    },{
      path: '/news',
      name: 'News',
      component: News
    },{
      path: '/identify',
      name: 'Identify',
      component: Identify
    },{
      path: '/report/',
      name: 'Report',
      component: Report
    },{
      path: '/report/:ficheName',
      name: 'Report',
      component: Report
    },{
      path: '/profile',
      name: 'Profile',
      component: Profile
    },{
      path: '/settings',
      name: 'Settings',
      component: Settings
    },{
      path: '/testdb',
      name: 'TestDB',
      component: TestDB
    },
  ]
})