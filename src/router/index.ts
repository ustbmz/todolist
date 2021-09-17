import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Add from '../components/add.vue'
import Delete from '../components/delete.vue'
import Done from '../components/done.vue'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '', redirect: { name: 'add' }
      },
      {
        path: '/add',
        name: 'add',
        component: Add
      },
      {
        path: '/done',
        name: 'done',
        component: Done
      },
      {
        path: '/delete',
        name: 'delete',
        component: Delete
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active'
})

export default router
