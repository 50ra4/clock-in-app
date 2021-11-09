import { FETCH_STATUS_ENUM, LOGIN_STATUS_ENUM } from 'constants/enum';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fireAuthentication } from 'services/firebase';
import { authenticationActions } from 'store/authentication';
import { AppState } from 'store/root';

/**
 * @see https://usehooks.com/useAuth/
 */
export const useAuthentication = () => {
  const dispatch = useDispatch();

  const isFetching = useSelector((state: AppState) => state.authentication.fetchStatus === FETCH_STATUS_ENUM.fetching);
  const isLoggedIn = useSelector(
    (state: AppState) => state.authentication?.data.loginStatus === LOGIN_STATUS_ENUM.success,
  );
  const loggedInUid = useSelector((state: AppState) => state.authentication?.data.uid);

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      dispatch(authenticationActions.loggingIn());
      try {
        await fireAuthentication.setPersistence('local');
        const credential = await fireAuthentication.signInWithEmailAndPassword(email, password);
        dispatch(authenticationActions.success());
        return { result: true, credential } as const;
      } catch (error) {
        dispatch(authenticationActions.failed({ error: error as Error }));
        return { result: false, error } as const;
      }
    },
    [dispatch],
  );

  const signUpWithPassword = useCallback(
    async (email: string, password: string) => {
      dispatch(authenticationActions.loggingIn());
      try {
        const credential = await fireAuthentication.createUserWithEmailAndPassword(email, password);
        dispatch(authenticationActions.success());
        return { result: true, credential } as const;
      } catch (error) {
        dispatch(authenticationActions.failed({ error: error as Error }));
        return { result: false, error } as const;
      }
    },
    [dispatch],
  );

  const signOut = useCallback(async () => {
    dispatch(authenticationActions.loggingIn());
    try {
      await fireAuthentication.signOut();
      dispatch(authenticationActions.logout());
      return { result: true } as const;
    } catch (error) {
      dispatch(authenticationActions.failed({ error: error as Error }));
      return { result: false, error } as const;
    }
  }, [dispatch]);

  return {
    isLoggedIn,
    isFetching,
    loggedInUid,
    signInWithPassword,
    signUpWithPassword,
    signOut,
  };
};

export const useDetectAuthStateChanged = () => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error>();

  const { isLoggedIn } = useAuthentication();

  // Subscribe to user on mount
  useEffect(() => {
    const unsubscribe = fireAuthentication.onAuthStateChanged(
      // eslint-disable-next-line complexity
      (user) => {
        if (user) {
          if (!isLoggedIn) {
            dispatch(authenticationActions.success());
          }
          dispatch(authenticationActions.setData({ emailVerified: !!user.emailVerified, uid: user.uid }));
        } else {
          if (isLoggedIn) {
            dispatch(authenticationActions.logout());
          }
        }

        if (!isInitialized) {
          setIsInitialized(true);
        }
      },
      (error) => {
        // TODO: error handling
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { code, message } = error;
        setError(new Error(message));
        // eslint-disable-next-line no-console
        console.error('authentication error');
      },
      () => {
        // eslint-disable-next-line no-console
        console.log('authentication completed');
      },
    );
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { isInitialized };
};
