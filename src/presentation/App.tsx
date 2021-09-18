import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { lightTheme } from './styles/theme';
import { configureStore } from 'store/root';
import { GlobalStyle } from './styles/global';
import { LoadingGuard } from './components/feedback/LoadingGuard/LoadingGuard';
import { ROUTES, ErrorPage } from './routes';
import { ErrorBoundary } from './ErrorBoundary';
import { ERROR_HEADING_WITH_MESSAGE } from 'constants/error';

const store = configureStore({});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
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
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
