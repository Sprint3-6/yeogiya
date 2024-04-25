import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './redux/store/store';
import { router } from './routes/routes';

import './styles/_base.scss';

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
