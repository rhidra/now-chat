import { createSlice } from '@reduxjs/toolkit'
import ChatProxy from '../models/chat-proxy'
import MessageFormat from '../models/message-format';

export const apiSlice = createSlice({
  name: 'api',
  
  initialState: {
    chatProxy: null,
    msgFormat: null,
  },

  reducers: {
    setup: state => {
      state.chatProxy = new ChatProxy();
      state.msgFormat = new MessageFormat(state.chatProxy);
    }
  }
});

export const { setup } = apiSlice.actions

export default apiSlice.reducer