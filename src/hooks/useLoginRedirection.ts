import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuthentication } from './useAuthentication';
import { PAGE_PATH } from 'constants/path';

export const useLoginRedirection = () => {
  const history = useHistory();
  const { isLoggedIn } = useAuthentication();

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }
    const searchParams = new URLSearchParams();
    searchParams.append('from', `${history.location.pathname}${history.location.search}`);
    // TODO: feedback message
    history.replace({ pathname: PAGE_PATH.login, search: searchParams.toString() });

    // NOTE: run when isLoggedIn changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
};
