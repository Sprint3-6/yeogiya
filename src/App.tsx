import { RouterProvider } from 'react-router-dom';

import { router } from './routes/routes';

function App() {
  const a = 1;
  console.log(a);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
