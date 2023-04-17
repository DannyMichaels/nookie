import { useAuthStore } from '@/stores'
import api from '../services/apiConfig'

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}

function request(method) {
  return async (url, body) => {
    const requestOptions = {
      method,
      headers: {}
    }

    const authHeader = getAuthHeader()
    if (authHeader) {
      requestOptions.headers['Authorization'] = authHeader
    }

    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.data = body
    }
    return await api(url, requestOptions).then(handleResponse)
  }
}

// helper functions
function getAuthHeader() {
  return localStorage.getItem('authToken') || null
}

async function handleResponse(response) {
  const { data, statusText } = response
  // check for error response
  if (statusText !== 'OK') {
    const { user, logout } = useAuthStore()
    if ([401, 403].includes(response.status) && user) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      logout()
    }

    // get error message from body or default to response status
    const error = (data && data.message) || response.status
    return Promise.reject(error)
  }

  return data
}
