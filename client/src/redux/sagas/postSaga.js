import axios from "axios";
import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import { push } from "redux-first-history"; // Updated import
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_LOADING_REQUEST,
  CATEGORY_FIND_FAILURE,
  CATEGORY_FIND_SUCCESS,
  CATEGORY_FIND_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_REQUEST,
} from "../types";

// All Posts Load
const loadPostAPI = (payload) => axios.get(`/api/post/skip/${payload}`);

function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.payload);
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error("Load Posts Error:", e.response || e.message);
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

// Post Upload
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("/api/post", payload, config);
};

function* uploadPosts(action) {
  try {
    const result = yield call(uploadPostAPI, action.payload);
    if (result.data && result.data._id) {
      yield put({
        type: POST_UPLOADING_SUCCESS,
        payload: result.data,
      });
      yield put(push(`/`)); // Navigate to the home page after success
    } else {
      throw new Error("Invalid post response");
    }
  } catch (e) {
    console.error("Post Upload Error:", e.response || e.message);
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchUploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

// Post Detail
const loadPostDetailAPI = (payload) => axios.get(`/api/post/${payload}`);

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error("Post Detail Error:", e.response || e.message);
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchLoadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

// Post Delete
const deletePostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.delete(`/api/post/${payload.id}`, config);
};

function* deletePost(action) {
  try {
    yield call(deletePostAPI, action.payload);
    yield put({
      type: POST_DELETE_SUCCESS,
    });
    yield put(push("/"));
  } catch (e) {
    console.error("Post Delete Error:", e.response || e.message);
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, deletePost);
}

// Post Edit Load
const postEditLoadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.get(`/api/post/${payload.id}/edit`, config);
};

function* postEditLoad(action) {
  try {
    const result = yield call(postEditLoadAPI, action.payload);
    yield put({
      type: POST_EDIT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error("Post Edit Load Error:", e.response || e.message);
    yield put({
      type: POST_EDIT_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchPostEditLoad() {
  yield takeEvery(POST_EDIT_LOADING_REQUEST, postEditLoad);
}

// Post Edit Upload
const postEditUploadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* postEditUpload(action) {
  try {
    const result = yield call(postEditUploadAPI, action.payload);
    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    console.error("Post Edit Upload Error:", e.response || e.message);
    yield put({
      type: POST_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchPostEditUpload() {
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, postEditUpload);
}

// Category Find
const categoryFindAPI = (payload) => axios.get(`/api/post/category/${encodeURIComponent(payload)}`);

function* categoryFind(action) {
  try {
    const result = yield call(categoryFindAPI, action.payload);
    yield put({
      type: CATEGORY_FIND_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error("Category Find Error:", e.response || e.message);
    yield put({
      type: CATEGORY_FIND_FAILURE,
      payload: e,
    });
  }
}

function* watchCategoryFind() {
  yield takeEvery(CATEGORY_FIND_REQUEST, categoryFind);
}

// Search Find
const searchResultAPI = (payload) =>
  axios.get(`/api/search/${encodeURIComponent(payload)}`);

function* searchResult(action) {
  try {
    const result = yield call(searchResultAPI, action.payload);
    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error("Search Error:", e.response || e.message);
    yield put({
      type: SEARCH_FAILURE,
      payload: e.response?.data?.message || "Unknown error",
    });
  }
}

function* watchSearchResult() {
  yield takeEvery(SEARCH_REQUEST, searchResult);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadPosts),
    fork(watchLoadPostDetail),
    fork(watchDeletePost),
    fork(watchPostEditLoad),
    fork(watchPostEditUpload),
    fork(watchCategoryFind),
    fork(watchSearchResult),
  ]);
}
