import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import createRootReducer from './redux/reducers/index';
import rootSaga from './redux/sagas';

// Create a browser history instance
export const history = createBrowserHistory();

const { routerMiddleware, createReduxHistory } = createReduxHistoryContext({
  history,
  basename: '', // Adjust if your app has a base path
});

// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine middlewares
const middlewares = [sagaMiddleware, routerMiddleware];

const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'REGISTER_FAILURE',
          'USER_LOADING_FAILURE',
          'LOGIN_FAILURE',
          'LOGOUT_FAILURE',
        ], // Ignore non-serializable actions causing warnings
        ignoredPaths: [
          'auth.headers', // Ignore headers to prevent serializable errors
          'auth.errorMsg', // Ignore non-serializable error messages
        ],
      },
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export the store and history
export const reduxHistory = createReduxHistory(store);
export default store;
