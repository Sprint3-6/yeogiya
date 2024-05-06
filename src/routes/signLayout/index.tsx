import { Navigate, Outlet } from 'react-router-dom';

export default function SignLayout() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken && refreshToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}
