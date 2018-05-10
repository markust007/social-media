import Vue from 'vue'
import Router from 'vue-router'

import Auth from './containers/components/Auth.vue'
import Dashboard from './containers/components/Dashboard.vue'
import Comments from './containers/components/Comments.vue'
import Wishlist from './containers/components/Wishlist.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: '/client_projects/StudioB/models/',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist
    }
  ]
})
