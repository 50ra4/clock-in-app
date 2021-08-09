import React from 'react';
import { RouteProps } from 'react-router-dom';
import { PAGE_PATH } from 'constants/path';

const TopPage = React.lazy(() => import('./pages/TopPage/TopPage'));

export const ROUTES: RouteProps[] = [
  {
    exact: true,
    path: PAGE_PATH.top,
    component: TopPage,
  },
];
