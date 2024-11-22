import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from @reduxjs/toolkit
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history'; // Import createBrowserHistory from history
import { createReduxHistoryContext } from 'redux-first-history'; // Import createReduxHistoryContext

import createRootReducer from './redux/reducers/index';
import rootSaga from './redux/sagas';

export const history = createBrowserHistory();

// Create history context
const { routerMiddleware } = createReduxHistoryContext({
  history, // Pass history to createReduxHistoryContext
  basename: '', // Optional: specify if you have a base URL path for routing
});

const sagaMiddleware = createSagaMiddleware();

// Set up middlewares
const middlewares = [sagaMiddleware, routerMiddleware];

const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['REGISTER_FAILURE'], // Ignore specific actions
        ignoredPaths: ['auth.headers'], // Ignore non-serializable paths in the state
      },
    }).concat(middlewares), // Combine default and custom middlewares
  devTools: process.env.NODE_ENV !== 'production',
});
sagaMiddleware.run(rootSaga);

export default store;
