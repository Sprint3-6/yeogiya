import { configureStore } from '@reduxjs/toolkit';
import myInfoReducer from '../myInfoSlice';

const store = configureStore({
  reducer: {
    myInfo: myInfoReducer,
  },
});

export default store;
