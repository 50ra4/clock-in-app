import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import { lightTheme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import { LoadingGuard } from './components/feedback/LoadingGuard/LoadingGuard';
import { ROUTES, ErrorPage } from './routes';
import { ErrorBoundary } from './ErrorBoundary';
import { ERROR_HEADING_WITH_MESSAGE } from 'constants/error';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle theme={lightTheme} />
      <Suspense fallback={<LoadingGuard open={true} />}>
        <ErrorBoundary>
          <Switch>
            {ROUTES.map((routeProps, i) => (
              <Route key={`route-${i}`} {...routeProps} />
            ))}
            <Route component={() => <ErrorPage {...ERROR_HEADING_WITH_MESSAGE.NOT_FOUND} />} />
          </Switch>
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
