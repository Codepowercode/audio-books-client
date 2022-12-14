import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  isAuthenticated: false,
  accessToken: JSON.parse(localStorage.getItem('accessToken')) || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setToken(state, action) {
      state.accessToken = action.payload.token
      localStorage.setItem('accessToken', JSON.stringify(action.payload.token))
      // localStorage.setItem(JSON.stringify(""))
    },
    removeToken(state) {
      state.accessToken = null
      localStorage.removeItem('accessToken')
    },
  },
})

export const authActions = authSlice.actions
export const { setToken, removeToken } = authSlice.actions

export default authSlice.reducer
