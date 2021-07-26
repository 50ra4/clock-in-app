import * as authenticationService from 'services/authentication';
import { ThunkAction } from 'redux-thunk';
import { AppState } from 'store/root';
import { AuthenticationActions, authenticationActions } from 'store/authentication';
import { initializeState, RootActions } from 'store/rootActions';

export const signInUser =
  (email: string, password: string): ThunkAction<void, AppState, undefined, AuthenticationActions> =>
  async (dispatch) => {
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
  async (dispatch) => {
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

export const signOutUser = (): ThunkAction<void, AppState, undefined, RootActions> => async (dispatch) => {
  await authenticationService.signOut();
  dispatch(initializeState());
};
