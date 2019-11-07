import { put, take, takeLatest, takeEvery, call } from "redux-saga/effects";
import "cross-fetch";

export async function fetchData(url) {
  const resp = await fetch(url)
  const json = await resp.json()
  
  return json.data.children
}

export function* watchPosts() {
  yield takeLatest("GET_POSTS", getPosts);
}

export function* getPosts(action) {
  yield put({ type: "FETCH_POSTS_START" });
  try {
    const data = yield call(
      fetchData,
      `https://www.reddit.com/r/${action.payload}.json`
    );
    yield put({ type: "FETCH_POSTS_SUCCESS", payload: data });
  } catch {
    yield put({ type: "FETCH_POSTS_FAILURE" });
  }
}
