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
  reducer: createRootReducer(history), // Use the root reducer with history
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares), // Combine default middleware and custom middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable devTools in non-production environments
});

sagaMiddleware.run(rootSaga);

export default store;
