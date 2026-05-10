import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:         null,   // { id, name, email, role }
    token:        null,   // access token
    refreshToken: null,   // refresh token
    isAuthenticated: false,
  },
  reducers: {
    setCredentials(state, { payload }) {
      state.user            = payload.user
      state.token           = payload.token
      state.refreshToken    = payload.refreshToken
      state.isAuthenticated = true
    },
    updateToken(state, { payload }) {
      state.token        = payload.token
      state.refreshToken = payload.refreshToken
    },
    logout(state) {
      state.user            = null
      state.token           = null
      state.refreshToken    = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, updateToken, logout } = authSlice.actions
export default authSlice.reducer

// Selectors
export const selectUser  = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectRole  = (state) => state.auth.user?.role
export const selectIsAuth = (state) => state.auth.isAuthenticated