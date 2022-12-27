import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './auth'
import profileChordReducer from './chord-profile';
import currentUserReducer from './current-user';
import quizReducer from './difficulty';
import profileReducer from './profile';

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    user: currentUserReducer,
    difficulty: quizReducer,
    profile: profileChordReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(thunk),
});