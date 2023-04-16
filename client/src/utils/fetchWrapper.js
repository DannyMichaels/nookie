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
      headers: authHeader()
    }
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.body = JSON.stringify(body)
    }
    return await api(url, requestOptions).then(handleResponse)
  }
}

// helper functions

function authHeader() {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.token
  if (isLoggedIn) {
    return { Authorization: `${user.token}` }
  } else {
    return {}
  }
}

async function handleResponse(response) {
  try {
    console.log('HANDLERESPONSE', response)
    const { data } = response

    // check for error response
    if (!response.ok) {
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
  } catch (error) {
    console.log('handle response error', error)
    throw error
  }
}
