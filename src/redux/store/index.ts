import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import myInfo from '../myInfoSlice';

const rootReducer = combineReducers({
  myInfo,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // prettier-ignore
    ),
});

const persistedStore = persistStore(store);

export default persistedStore;
export const useAppSelector = useSelector.withTypes<RootState>();
export type RootState = ReturnType<typeof store.getState>;
