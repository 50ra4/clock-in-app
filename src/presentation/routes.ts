import React from 'react';
import { RouteProps } from 'react-router-dom';
import { PAGE_PATH } from 'constants/path';
import { EnumValue } from 'types';

export const ErrorPage = React.lazy(() => import('./pages/ErrorPage/ErrorPage'));
const TopPage = React.lazy(() => import('./pages/TopPage/TopPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = React.lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const TimecardDetailPage = React.lazy(() => import('./pages/TimecardDetailPage/TimecardDetailPage'));

type PagePath = EnumValue<typeof PAGE_PATH>;
export const ROUTES: RouteProps<PagePath>[] = [
  {
    exact: true,
    path: PAGE_PATH.top,
    component: TopPage,
  },
  {
    exact: true,
    path: PAGE_PATH.error,
    component: ErrorPage,
  },
  {
    exact: true,
    path: PAGE_PATH.login,
    component: LoginPage,
  },
  {
    exact: true,
    path: PAGE_PATH.registration,
    component: RegistrationPage,
  },
  {
    exact: true,
    path: PAGE_PATH.timecardDetail,
    component: TimecardDetailPage,
  },
];
