import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { URLQueryObject, stringifySearchParams } from 'utils/urlQueryStringUtil';

type Props<T> = {
  parser: (queryString: string) => T;
  options?: {
    shouldPush?: boolean;
  };
};

export const useUrlQueryString = <T extends URLQueryObject>({ parser, options = { shouldPush: false } }: Props<T>) => {
  const history = useHistory();
  const { search } = history.location;

  const query = useMemo(() => parser(search), [parser, search]);
  const setQuery = useCallback(
    // eslint-disable-next-line complexity
    (stateAction: T | ((prev: T) => T), historyAction?: 'push' | 'replace') => {
      const action = historyAction ?? !!options?.shouldPush ? 'push' : 'replace';
      const updated = stateAction instanceof Function ? stateAction(query) : stateAction;
      history[action](
        action === 'replace'
          ? { ...history.location, search: stringifySearchParams(updated) }
          : { pathname: history.location.pathname, search: stringifySearchParams(updated) },
      );
    },
    [history, options?.shouldPush, query],
  );

  return [query, setQuery] as const;
};
