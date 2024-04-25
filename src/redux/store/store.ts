import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import myInfoReducer from '../myInfoSlice';

const store = configureStore({
  reducer: {
    myInfo: myInfoReducer,
  },
});

export default store;
export const useAppSelector = useSelector.withTypes<RootState>();
export type RootState = ReturnType<typeof store.getState>;
