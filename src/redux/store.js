import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chat';
import userReducer from './user';
import apiReducer from './api';

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    api: apiReducer,
  }
});