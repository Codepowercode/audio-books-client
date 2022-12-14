import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialAuthState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    removeUser(state) {
      state.user = {}
      localStorage.removeItem('user')
    },
  },
})

export const userActions = userSlice.actions
export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
