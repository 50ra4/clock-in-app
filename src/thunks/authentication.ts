import * as authenticationService from 'services/authentication';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from '@reduxjs/toolkit';
import { AppState } from 'store/root';
import { AuthenticationActions, authenticationActions } from 'store/authentication';
import { initializeState, RootActions } from 'store/rootActions';

export const signInUser =
  (email: string, password: string): ThunkAction<void, AppState, undefined, AuthenticationActions> =>
  async (dispatch: Dispatch<AuthenticationActions>) => {
    dispatch(authenticationActions.loggingIn());
    await authenticationService
      .signIn(email, password)
      .then((user) => {
        dispatch(authenticationActions.success({ emailVerified: !!user?.emailVerified }));
      })
      .catch((err) => {
        dispatch(authenticationActions.failed(err));
      });
  };

export const signUpUser =
  (email: string, password: string): ThunkAction<void, AppState, undefined, AuthenticationActions> =>
  async (dispatch: Dispatch<AuthenticationActions>) => {
    dispatch(authenticationActions.loggingIn());
    await authenticationService
      .signUp(email, password)
      .then((user) => {
        dispatch(authenticationActions.success({ emailVerified: !!user?.emailVerified }));
      })
      .catch((err) => {
        dispatch(authenticationActions.failed(err));
      });
  };

export const signOutUser =
  (): ThunkAction<void, AppState, undefined, RootActions> => async (dispatch: Dispatch<RootActions>) => {
    await authenticationService.signOut();
    dispatch(initializeState());
  };
