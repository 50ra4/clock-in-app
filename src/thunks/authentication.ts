import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from 'store/root';
import { AuthenticationActions, authenticationActions } from 'store/authentication';
import { initializeState, RootActions } from 'store/rootActions';
import * as authenticationService from 'services/authentication';

export const signInUser = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<AppState, unknown, AuthenticationActions>) => {
    dispatch(authenticationActions.loggingIn());
    const result = await authenticationService
      .signInWithPassword(email, password)
      .then((user) => {
        dispatch(authenticationActions.success({ emailVerified: !!user?.emailVerified }));
        return true;
      })
      .catch((err) => {
        dispatch(authenticationActions.failed(err));
        return false;
      });
    return result;
  };
};

export const signUpUser =
  (email: string, password: string) => async (dispatch: ThunkDispatch<AppState, unknown, AuthenticationActions>) => {
    dispatch(authenticationActions.loggingIn());
    const result = await authenticationService
      .signUpWithPassword(email, password)
      .then((user) => {
        dispatch(authenticationActions.success({ emailVerified: !!user?.emailVerified }));
        return true;
      })
      .catch((err) => {
        dispatch(authenticationActions.failed(err));
        return false;
      });
    return result;
  };

export const signOutUser = (): ThunkAction<void, AppState, undefined, RootActions> => async (dispatch) => {
  await authenticationService.signOut();
  dispatch(initializeState());
};
