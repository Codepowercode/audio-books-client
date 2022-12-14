import authReducer from './slice/auth'
import userReducer from './slice/user'
import wishListReducer from './slice/wishList'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    wishList: wishListReducer,
  },
})
