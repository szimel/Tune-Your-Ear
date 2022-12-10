import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './auth'
import currentUserReducer from './current-user';
import profileReducer from './profile';

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    user: currentUserReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(thunk),
});