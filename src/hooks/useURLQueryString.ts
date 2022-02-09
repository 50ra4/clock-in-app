import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { URLQueryObject, stringifyURLQuery } from 'utils/URLQueryStringUtil';

type Props<T extends URLQueryObject> = {
  parser: (queryString: string) => T;
  stringify?: (urlQuery: T) => string;
  options?: {
    shouldPush?: boolean;
  };
};

export const useURLQueryString = <T extends URLQueryObject>({
  parser,
  stringify = stringifyURLQuery,
  options = { shouldPush: false },
}: Props<T>) => {
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
          ? { ...history.location, search: stringify(updated) }
          : { pathname: history.location.pathname, search: stringify(updated) },
      );
    },
    [history, options?.shouldPush, query, stringify],
  );

  return [query, setQuery] as const;
};
