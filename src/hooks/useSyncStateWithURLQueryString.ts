import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

type Props<T extends Record<string, unknown>> = {
  stringify: (query: T) => string;
  parser: (queryString: string) => T;
  initialQuery: T;
  options?: {
    push?: boolean;
  };
};

export const useSyncStateWithURLQueryString = <T extends Record<string, unknown>>({
  stringify,
  parser,
  initialQuery,
  options,
}: Props<T>) => {
  const history = useHistory();
  const [query, setQuery] = useState(history.location.search ? parser(history.location.search) : initialQuery);

  useEffect(() => {
    const historyFn = options?.push ? history.push : history.replace;
    historyFn({ pathname: history.location.pathname, search: stringify(query) });
    // NOTE: execute only when changed query
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return [query, setQuery] as const;
};
