import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import myInfo from '../myInfoSlice';

import { reservationStatusApi } from '@/api/reservationStatusApi';

const rootReducer = combineReducers({
  myInfo,
  [reservationStatusApi.reducerPath]: reservationStatusApi.reducer,
  // reservationStatusApi: reservationStatusApi, // 이렇게 하면 틀릴 수도 있음
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      // prettier-ignore
      reservationStatusApi.middleware,
    ),
});

const persistedStore = persistStore(store);

export default persistedStore;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
