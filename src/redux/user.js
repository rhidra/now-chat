import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  
  initialState: {
    username: 'anonymous',
    users: [],
  },

  reducers: {
    updateUsername: (state, {payload}) => {
      state.username = payload;
    },

    updateUsersList: (state, {payload}) => {
      state.users = payload;
    }
  }
})

export const { updateUsername, updateUsersList } = userSlice.actions

export default userSlice.reducer