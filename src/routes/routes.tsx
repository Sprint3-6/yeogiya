/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import ActivityDetails from '@/pages/ActivityDetails';
import Loading from '@/pages/Loading';
import MainPage from '@/pages/Main';
import MyInfo from '@/pages/MyInfo';
import MySpaceManagement from '@/pages/MySpaceManagement';
import NotFound from '@/pages/NotFound';
import ReservationDetails from '@/pages/ReservationDetails';
import ReservationStatus from '@/pages/ReservationStatus';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import '../styles/_base.scss';
import Layout from './layout';

const PrimaryRoute = (
  <>
    <Route element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="reservation-status" element={<ReservationStatus />} />
      <Route path="reservation-details" element={<ReservationDetails />} />
      <Route path="my-info" element={<MyInfo />} />
      <Route path="activity/:id" element={<ActivityDetails />} />
      <Route path="activity-management" element={<MySpaceManagement />} />
    </Route>
    <Route path="loading" element={<Loading />} />
    <Route path="sign-up" element={<SignUp />} />
    <Route path="sign-in" element={<SignIn />} />
    <Route path="*" element={<NotFound />} />
  </>
);

const baseRoute = createRoutesFromElements(PrimaryRoute);

export const router = createBrowserRouter(baseRoute);
