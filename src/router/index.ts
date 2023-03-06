// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/posts/:id',
    component: () => import('@/layouts/Mobile.vue'),
    children: [
      {
        path: '',
        name: 'Posts',
        component: () => import('@/views/Post.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to)=> {
  const {name, params} = to
 
  if((name && name != 'Posts') || isNaN(+params.id)) {
    return {name:'Posts', params: {id: 1}}
  }
})


export default router
