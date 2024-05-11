/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './layout';
import MypageLayout from './mypagelayout';
import SignLayout from './signLayout';

const SpaceDetails = lazy(() => import('@/pages/SpaceDetails'));
const MainPage = lazy(() => import('@/pages/Main'));
const MySpaceManagement = lazy(() => import('@/pages/MySpaceManagement'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const ReservationStatus = lazy(() => import('@/pages/ReservationStatus'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const MyPage = lazy(() => import('@/pages/MyPage'));
const MyReservation = lazy(() => import('@/pages/MyReservation'));
const EditSpace = lazy(() => import('@/pages/EditSpace'));
const AddSpace = lazy(() => import('@/pages/AddSpace'));

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
