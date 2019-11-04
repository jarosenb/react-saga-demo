import { put, takeLatest, call } from "redux-saga/effects";
import 'cross-fetch';

export function* watchPosts() {
  yield takeLatest("GET_POSTS", getPosts);
}

export function* getPosts(action) {

  yield put({ type: "FLUSH_POSTS" });
  yield put({ type: "SHOW_SPINNER" });

  const data = yield call(fetch, `https://www.reddit.com/r/${action.payload}.json`)
  const json = yield data.json()

  yield put({ type: "ADD_POSTS", payload: json.data.children});
  yield put({ type: "HIDE_SPINNER" });
}


