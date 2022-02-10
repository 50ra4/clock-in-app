import { combineReducers, applyMiddleware, configureStore as _configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { ROOT_ACTIONS } from './rootActions';
import { authenticationReducer } from './authentication';
import { connectedDialogReducer } from './connectedDialog';
import { myProfileReducer } from './myProfile';
import { userPreferenceReducer } from './userPreference';
import { snackbarReducer } from './snackbar';
import { holidayModule } from './holiday';

const reducers = combineReducers({
  authentication: authenticationReducer,
  myProfile: myProfileReducer,
  connectedDialog: connectedDialogReducer,
  snackbar: snackbarReducer,
  userPreference: userPreferenceReducer,
  holiday: holidayModule.reducer,
});
export type AppState = ReturnType<typeof reducers>;

const rootReducer: typeof reducers = (state, action) => {
  if (action.type === ROOT_ACTIONS.initializeState) {
    state = undefined;
  }
  return reducers(state, action);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configureStore = (initialState: any) =>
  _configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: true,
    enhancers: [applyMiddleware(thunk)],
  });
export type AppDispatch = ReturnType<typeof configureStore>['dispatch'];
