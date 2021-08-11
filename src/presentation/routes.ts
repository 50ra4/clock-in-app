import React from 'react';
import { RouteProps } from 'react-router-dom';
import { PAGE_PATH } from 'constants/path';
import { EnumValue } from 'types';

const TopPage = React.lazy(() => import('./pages/TopPage/TopPage'));
export const ErrorPage = React.lazy(() => import('./pages/ErrorPage/ErrorPage'));

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
];
