import { combineReducers } from "redux";
import { connectRouter } from "react-first-history";
import authReducer from "./authReducer.js";
import postReducer from "./postReducer.js";
import commentReducer from "./commentReducer.js";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
  });

export default createRootReducer;