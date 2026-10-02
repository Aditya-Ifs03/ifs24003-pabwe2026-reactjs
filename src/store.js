import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/states/authSlice';
import userReducer from './features/users/states/userSlice';
import lostFoundReducer from './features/lost-founds/states/lostFoundSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    lostFound: lostFoundReducer,
  },
});

export default store;