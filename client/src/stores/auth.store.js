import { defineStore } from 'pinia'

import { fetchWrapper } from '../utils/fetchWrapper'
import { router } from '@/router'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(email, password) {
      const { user, authToken } = await fetchWrapper.post('/login', { email, password })

      // update pinia state
      this.user = { ...user, token: authToken.token }
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))

      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/')
    },
    async register(formData) {
      await fetchWrapper.post('/register', formData)
    },
    logout() {
      this.user = null
      router.push('/account/login')
    }
  }
})
