/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import SpaceDetails from '@/pages/SpaceDetails';
import Loading from '@/pages/Loading';
import MainPage from '@/pages/Main';
import MySpaceManagement from '@/pages/MySpaceManagement';
import NotFound from '@/pages/NotFound';
import ReservationStatus from '@/pages/ReservationStatus';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Layout from './layout';
import MyPage from '@/pages/MyPage';
import MyReservation from '@/pages/MyReservation';
import EditSpace from '@/pages/EditSpace';
import AddSpace from '@/pages/AddSpace';

const PrimaryRoute = (
  <>
    <Route element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="space/:id" element={<SpaceDetails />} />
      <Route path="mypage/admin/status" element={<ReservationStatus />} />
      <Route path="mypage/admin/edit/:id" element={<EditSpace />} />
      <Route path="mypage/admin/add" element={<AddSpace />} />
      <Route path="mypage/admin" element={<MySpaceManagement />} />
      <Route path="mypage/reservation" element={<MyReservation />} />
      <Route path="mypage" element={<MyPage />} />
    </Route>
    <Route path="loading" element={<Loading />} />
    <Route path="sign-up" element={<SignUp />} />
    <Route path="sign-in" element={<SignIn />} />
    <Route path="*" element={<NotFound />} />
  </>
);

const baseRoute = createRoutesFromElements(PrimaryRoute);

export const router = createBrowserRouter(baseRoute);
