import { all, fork } from "redux-saga/effects";
import axios from "axios";

import authSaga from "./authSaga";
import postSaga from "./postSaga";
import commentSaga from "./commentSaga";

import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = 'http://localhost:7000';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(postSaga), fork(commentSaga)]);
}