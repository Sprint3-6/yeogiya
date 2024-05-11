/* eslint-disable react-refresh/only-export-components */

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import AddSpace from '@/pages/AddSpace';
import EditSpace from '@/pages/EditSpace';
import MainPage from '@/pages/Main';
import MyPage from '@/pages/MyPage';
import MyReservation from '@/pages/MyReservation';
import MySpaceManagement from '@/pages/MySpaceManagement';
import NotFound from '@/pages/NotFound';
import ReservationStatus from '@/pages/ReservationStatus';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import SpaceDetails from '@/pages/SpaceDetails';
import Layout from './layout';
import MypageLayout from './mypagelayout';
import SignLayout from './signLayout';

const PrimaryRoute = (
  <>
    <Route element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="space/:id" element={<SpaceDetails />} />
      <Route element={<MypageLayout />}>
        <Route path="mypage/admin/status" element={<ReservationStatus />} />
        <Route path="mypage/admin/edit/:id" element={<EditSpace />} />
        <Route path="mypage/admin/add" element={<AddSpace />} />
        <Route path="mypage/admin" element={<MySpaceManagement />} />
        <Route path="mypage/reservation" element={<MyReservation />} />
        <Route path="mypage" element={<MyPage />} />
      </Route>
    </Route>
    <Route element={<SignLayout />}>
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </>
);

const baseRoute = createRoutesFromElements(PrimaryRoute);

export const router = createBrowserRouter(baseRoute);
