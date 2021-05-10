import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiProxy from '../models/api-proxy';

export const refreshUsers = createAsyncThunk('user/refreshUsers', async () => {
  const users = await ApiProxy.getUsers();
  return users;
});

export const userSlice = createSlice({
  name: 'user',
  
  initialState: {
    username: 'anonymous',
    users: [],
    isLoading: false,
    error: '',
  },

  reducers: {
    updateUsername: (state, {payload}) => {
      state.username = payload;
    },
  },

  extraReducers: {
    [refreshUsers.pending]: state => {
      state.isLoading = true;
    },
    [refreshUsers.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.users = payload;
    },
    [refreshUsers.rejected]: (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
    },
  }
})

export const { updateUsername } = userSlice.actions

export default userSlice.reducer