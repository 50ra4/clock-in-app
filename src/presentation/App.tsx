import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import { lightTheme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import { LoadingGuard } from './components/feedback/LoadingGuard/LoadingGuard';
import { ROUTES, ErrorPage } from './routes';
import { ErrorBoundary } from './ErrorBoundary';
import { ERROR_HEADING_WITH_MESSAGE } from 'constants/error';
import { useDetectAuthStateChanged } from 'hooks/useAuthentication';
import { ConnectedDialog } from 'containers/ConnectedDialog';
import { ConnectedSnackbar } from 'containers/ConnectedSnackbar';

function App() {
  const { isInitialized } = useDetectAuthStateChanged();

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle theme={lightTheme} />
      <Suspense fallback={<LoadingGuard open={true} />}>
        <ErrorBoundary>
          {!isInitialized ? (
            <LoadingGuard open={true} />
          ) : (
            <Switch>
              {ROUTES.map((routeProps, i) => (
                <Route key={`route-${i}`} {...routeProps} />
              ))}
              <Route component={() => <ErrorPage {...ERROR_HEADING_WITH_MESSAGE.NOT_FOUND} />} />
            </Switch>
          )}
        </ErrorBoundary>
      </Suspense>
      <ConnectedDialog />
      <ConnectedSnackbar />
    </ThemeProvider>
  );
}

export default App;
