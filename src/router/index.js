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
      // Route permettant de faire passer le nom de l'espèce
      // depuis laquelle on appuie sur le bouton "signaler"
      // de la fiche depuis la vue 'Consult.vue' vers la vue
      // 'Report.vue' dans le champ select
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