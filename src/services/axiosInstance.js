import axios from 'axios'
import { store } from '../app/store'
import { updateToken, logout } from '../features/auth/authSlice'

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || '/api' })

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// On 401 → try refresh, retry original request
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = store.getState().auth.refreshToken
        const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL || '/api'}/auth/refresh`,
                                          { refreshToken })
        store.dispatch(updateToken(data))
        original.headers.Authorization = `Bearer ${data.token}`
        return api(original)
      } catch {
        store.dispatch(logout())
      }
    }
    return Promise.reject(error)
  }
)

export default api