import { combineReducers } from "redux";
import { createReduxHistoryContext } from "redux-first-history";
import authReducer from "./authReducer.js";
import postReducer from "./postReducer.js";
import commentReducer from "./commentReducer.js";
import { createBrowserHistory } from 'history'; // Import createBrowserHistory from 'history'

// Create the history object
export const history = createBrowserHistory();

const { routerReducer } = createReduxHistoryContext({
  history, // Pass the history object here
});

const createRootReducer = () =>
  combineReducers({
    router: routerReducer, // Using the correct routerReducer
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
  });

export default createRootReducer;
