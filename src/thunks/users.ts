import { ThunkAction } from 'redux-thunk';
import { Dispatch } from '@reduxjs/toolkit';
import { AppState } from 'store/root';
import { myProfileActions, MyProfileActions } from 'store/myProfile';
import { readUserByUid } from 'services/users';

export const fetchUserByUid =
  (uid: string): ThunkAction<void, AppState, undefined, MyProfileActions> =>
  async (dispatch: Dispatch<MyProfileActions>) => {
    dispatch(myProfileActions.fetching());
    await readUserByUid(uid)
      .then((user) => {
        dispatch(myProfileActions.setUserName(user));
      })
      .catch((err) => {
        dispatch(myProfileActions.failed(err));
      });
  };
