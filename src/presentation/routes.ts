import React from 'react';
import { RouteProps } from 'react-router-dom';
import { PAGE_PATH } from 'constants/path';

const TopPage = React.lazy(() => import('./pages/TopPage/TopPage'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage/ErrorPage'));

export const ROUTES: RouteProps[] = [
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
];
