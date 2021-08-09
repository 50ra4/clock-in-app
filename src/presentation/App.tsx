import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';

import { lightTheme } from 'styles/theme';
import { configureStore } from 'store/root';
import { GlobalStyle } from 'styles/global';
import { LoadingGuard } from './components/feedback/LoadingGuard/LoadingGuard';
import { ROUTES } from './routes';
import { PAGE_PATH } from 'constants/path';

const store = configureStore({});

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle theme={lightTheme} />
          <Suspense fallback={<LoadingGuard open={true} />}>
            <BrowserRouter>
              {ROUTES.map((routeProps, i) => (
                <Route key={`route-${i}`} {...routeProps} />
              ))}
              {/* FIXME: temporary */}
              <Route exact={true} path={PAGE_PATH.top} />
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
