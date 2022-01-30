import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { configureStore } from 'store/root';

import App from 'presentation/App';
import { ErrorBoundary } from 'presentation/ErrorBoundary';

const store = configureStore({});

export function AppRoot() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
