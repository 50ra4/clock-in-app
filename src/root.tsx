import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from 'store/root';

import App from 'presentation/App';
import { ErrorBoundary } from 'presentation/ErrorBoundary';

const store = configureStore({});

export function AppRoot() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
