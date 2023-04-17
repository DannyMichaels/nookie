import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/account/register',
      name: 'register',

      component: () => import('../views/account/RegisterView.vue')
    },
    {
      path: '/account/login',
      name: 'login',
      component: () => import('../views/account/LoginView.vue')
    }
  ]
})

// auth guard
router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/account/login', '/account/register']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()
  const isLoggedIn = !!authStore?.token

  if (authRequired && !isLoggedIn) {
    authStore.returnUrl = to.fullPath
    return '/account/login'
  }
})
