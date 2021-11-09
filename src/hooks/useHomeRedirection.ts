import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthentication } from './useAuthentication';
import { PAGE_PATH } from 'constants/path';

export const useHomeRedirection = () => {
  const history = useHistory();
  const { isLoggedIn } = useAuthentication();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    history.replace(PAGE_PATH.home);
  }, [history, isLoggedIn]);
};
