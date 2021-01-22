import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('../view/Home')
  },
  {
    path: '/upload',
    name: '上传',
    component: () => import('../view/Upload')
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
