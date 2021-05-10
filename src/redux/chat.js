import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ChatProxy from '../models/chat-proxy';
import MessageFormat from '../models/message-format';

// Connect to another user
export const connect = createAsyncThunk('chat/connect', async (user, {getState}) => {
  console.log('Trying to connect to', user.username, user.peerId);
  const {chat: {chatProxy}} = getState();
  await chatProxy.connect(user.peerId);
  return user;
});

export const sendData = createAsyncThunk('chat/sendData', async (data, {getState}) => {
  const {chat: {chatProxy}} = getState();
  const msg = MessageFormat.formatMessage(chatProxy.username, chatProxy.peerId, data);
  chatProxy.send(msg);
  return msg;
});

// Disconnect from the room
export const disconnect = createAsyncThunk('chat/disconnect', async (_, {getState}) => {
  const {chat: {chatProxy}} = getState();
  await chatProxy.disconnect();
});

export const chatSlice = createSlice({
  name: 'chat',
  
  initialState: {
    chatProxy: new ChatProxy(),
    status: 'disconnected',
    history: [],
  },

  reducers: {
    receiveConnection: state => {
      state.status = 'connected';
      state.history.push(MessageFormat.connection(state.chatProxy.username, state.chatProxy.peerId));
    },

    receiveDisconnection: (state, action) => {
      state.status = 'disconnected';
      state.history.push(MessageFormat.disconnection());
    },

    loading: state => {
      state.status = 'loading';
    },

    error: state => {
      state.status = 'error';
    },

    addMessage: (state, {payload}) => {
      state.history.push(payload);
    }
  },

  extraReducers: {
    [connect.pending]: state => { state.status = 'loading'; },
    [connect.rejected]: state => { state.status = 'error'; },
    [connect.fulfilled]: state => {
      state.status = 'connected';
      state.history.push(MessageFormat.connection(state.chatProxy.username, state.chatProxy.peerId));
    },
    
    [sendData.fulfilled]: (state, {payload}) => {
      state.history.push(payload);
    },

    [disconnect.pending]: state => { state.status = 'loading'; },
    [disconnect.fulfilled]: (state) => {
      // if (state.history[state.history.length - 1].type !== 'disconnection') {
      //   state.history.push(MessageFormat.disconnection(state.chatProxy.username, state.chatProxy.peerId));
      // }
    },
  }
})

export const { receiveDisconnection, loading, error, addMessage, receiveConnection } = chatSlice.actions

export default chatSlice.reducer