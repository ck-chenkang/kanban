import Vue from 'vue'
import Router from 'vue-router'
import kanban from '@/components/kanban'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'kanban',
      component: kanban
    }
  ]
})
