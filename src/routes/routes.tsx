/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Layout from './layout';
import MainPage from '../pages/Main';
import ReservationStatus from '../pages/ReservationStatus';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import MyInfo from '../pages/MyInfo';
import ReservationDetails from '../pages/ReservationDetails';
import ActivityDetails from '../pages/ActivityDetails';
import ActivityManagement from '../pages/ActivityManagement';
import '../styles/_base.scss';

const PrimaryRoute = (
  <>
    <Route element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="reservation-status" element={<ReservationStatus />} />
      <Route path="reservation-details" element={<ReservationDetails />} />
      <Route path="my-info" element={<MyInfo />} />
      <Route path="activity/:id" element={<ActivityDetails />} />
      <Route path="activity-management" element={<ActivityManagement />} />
    </Route>
    <Route path="sign-up" element={<SignUp />} />
    <Route path="sign-in" element={<SignIn />} />
    <Route path="*" element={<NotFound />} />
  </>
);

const baseRoute = createRoutesFromElements(PrimaryRoute);

export const router = createBrowserRouter(baseRoute);
