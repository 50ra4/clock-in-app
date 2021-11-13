import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useAuthentication } from './useAuthentication';
import { PAGE_PATH } from 'constants/path';
import { showSnackbar } from 'thunks/snackbar';

export const useLoginRedirection = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useAuthentication();

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }
    const searchParams = new URLSearchParams();
    searchParams.append('from', `${history.location.pathname}${history.location.search}`);
    dispatch(showSnackbar({ severity: 'warning', content: 'ログインの有効期限が切れました' }));
    history.replace({ pathname: PAGE_PATH.login, search: searchParams.toString() });

    // NOTE: run when isLoggedIn changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
};
