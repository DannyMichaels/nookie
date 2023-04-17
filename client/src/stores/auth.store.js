import { defineStore } from 'pinia'
import { fetchWrapper } from '../utils/fetchWrapper'
import { router } from '@/router'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('authToken'),
    returnUrl: null
  }),
  actions: {
    async login(email, password) {
      console.log({ email, password })
      const { user, token } = await fetchWrapper.post('/auth/login', {
        email,
        password
      })

      // update pinia state
      this.user = user
      this.token = token

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('authToken', token)

      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/')
      return this.user
    },
    async register(formData) {
      const { user, token } = await fetchWrapper.post('/auth/register', formData)

      this.user = user
      this.token = token

      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('authToken', token)
      return this.user
    },
    async verify() {
      try {
        const { isAuthenticated = false, user, token } = await fetchWrapper.post('/auth/verify')

        this.user = user
        this.token = token

        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('authToken', token)

        if (!isAuthenticated) {
          this.logout()
        }

        return this.user
      } catch (error) {
        this.logout()
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      router.push('/account/login')
    }
  }
})
