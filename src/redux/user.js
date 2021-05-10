import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiProxy from '../models/api-proxy';

export const refreshUsers = createAsyncThunk('user/refreshUsers', async (_, {dispatch, getState}) => {
  const {chat: {chatProxy: {username: userId}}} = getState();
  const users = await ApiProxy.getUsers()
  const name = users.find(u => u.peerId === userId)?.username ?? 'anonymous';
  dispatch(updateUsername(name));
  return users;
});

export const changeUsername = createAsyncThunk('user/changeUsername', async (username, {dispatch, getState}) => {
  const {chat: {chatProxy}} = getState();
  await ApiProxy.updateUsername(username, chatProxy.username);
  dispatch(refreshUsers());
  return username;
});

export const userSlice = createSlice({
  name: 'user',
  
  initialState: {
    // Display username
    username: 'anonymous',

    // List of users
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
    [refreshUsers.pending]: state => { state.isLoading = true; },
    [refreshUsers.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.users = payload;
    },
    [refreshUsers.rejected]: (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
    },

    [changeUsername.pending]: state => { state.isLoading = true; },
    [changeUsername.fulfilled]: (state, {payload}) => {
      state.isLoading = true;
      state.username = payload;
    },
    [changeUsername.rejected]: (state, {payload}) => {
      state.isLoading = true;
      state.error = payload;
    }
  }
})

export const { updateUsername } = userSlice.actions

export default userSlice.reducer