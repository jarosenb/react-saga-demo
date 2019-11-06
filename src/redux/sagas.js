import { put, takeLatest, call } from "redux-saga/effects";
import "cross-fetch";

export function* watchPosts() {
  yield takeLatest("GET_POSTS", getPosts);
}

export function* getPosts(action) {
  yield put({ type: "FETCH_POSTS_START" });
  try {
    const data = yield call(
      fetch,
      `https://www.reddit.com/r/${action.payload}.json`
    );
    const json = yield data.json();
    yield put({ type: "FETCH_POSTS_SUCCESS", payload: json.data.children });
  } catch {
    yield put({ type: "FETCH_POSTS_FAILURE" });
  }
}
