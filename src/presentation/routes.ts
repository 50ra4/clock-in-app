import React from 'react';
import { RouteProps } from 'react-router-dom';
import { PAGE_PATH, PagePath } from 'constants/path';

export const ErrorPage = React.lazy(() => import('./pages/ErrorPage/ErrorPage'));
const TopPage = React.lazy(() => import('./pages/TopPage/TopPage'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = React.lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const TimecardDetailPage = React.lazy(() => import('./pages/TimecardDetailPage/TimecardDetailPage'));
const UserSettingPage = React.lazy(() => import('./pages/UserSettingPage/UserSettingPage'));

export const ROUTES: RouteProps<PagePath>[] = [
  {
    exact: true,
    path: PAGE_PATH.top,
    component: TopPage,
  },
  {
    exact: true,
    path: PAGE_PATH.home,
    component: HomePage,
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
  {
    exact: true,
    path: PAGE_PATH.userSetting,
    component: UserSettingPage,
  },
];
