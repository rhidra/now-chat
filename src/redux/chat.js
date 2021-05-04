import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  
  initialState: {
    status: 'disconnected',
    history: [],
  },

  reducers: {
    connect: (state, action) => {
      state.status = 'connected';
      if (action.payload) {
        state.history.push(action.payload);
      }
    },

    disconnect: (state, action) => {
      state.status = 'disconnected';
      if (action.payload) {
        state.history.push(action.payload);
      }
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
  }
})

export const { connect, disconnect, loading, error, addMessage } = chatSlice.actions

export default chatSlice.reducer