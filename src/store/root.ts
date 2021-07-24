/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, compose, applyMiddleware, StoreCreator, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { authenticationReducer } from './authentication';
import { myProfileReducer } from './myProfile';

export const reducers = combineReducers({
  authentication: authenticationReducer,
  myProfile: myProfileReducer,
});
export type AppState = ReturnType<typeof reducers>;

const rootReducer = (state: any, action: any) => {
  // if (action.type === rootActions.clearAllState.type) {
  //   state = undefined;
  // }
  return reducers(state, action);
};

// enhance
const enhancers = compose(
  applyMiddleware(thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: StoreCreator) => f,
);

export const configureStore = (initialState: any) => createStore(rootReducer, initialState, enhancers);
