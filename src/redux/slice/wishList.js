import { createSlice, removeListener } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}
const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addList(state, action) {
      return {
        ...state,
        list: action.payload,
      }
    },
    removeList(state, id) {
      return {
        ...state,
        list: [...state.list].filter((elem) => elem.id !== id),
      }
    },
  },
})

export const wishListActions = wishListSlice.actions
export const { addList, removeList } = wishListSlice.actions

export default wishListSlice.reducer
