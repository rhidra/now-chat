import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import chatReducer from './chat';
import userReducer from './user';
import apiReducer from './api';

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    api: apiReducer,
  },

  // Because the PeerJS Proxy class is not serializable, we add an exception for it in Redux
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ['api.chatProxy'],
    },
  }),
});