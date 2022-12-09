import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './auth'
import profileReducer from './profile';

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(thunk),
});