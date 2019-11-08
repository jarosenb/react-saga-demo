import { put, takeLatest, call } from "redux-saga/effects";
import fetch from "cross-fetch";

export async function fetchData(url) {
  try {
    const resp = await fetch(url);
    const json = await resp.json();
    return json.data.children;
  } catch (e) {
    throw new Error('Bad response from server.')
  }
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
