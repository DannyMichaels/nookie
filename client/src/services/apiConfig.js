import axios from 'axios'

const apiUrls = {
  production: import.meta.env.VITE_API_URL,
  development: 'http://localhost:3000/api'
}

const apiUrl = import.meta.env.NODE_ENV === 'production' ? apiUrls.production : apiUrls.development

const api = axios.create({
  baseURL: apiUrl
})

export default api
