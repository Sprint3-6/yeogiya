import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import persistedStore, { store } from './redux/store';
import './styles/_base.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from 'react';
import Loading from './pages/Loading';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  );
}
