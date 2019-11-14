import { put, takeLatest, takeEvery, call, all } from "redux-saga/effects";
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

export function* watchSelect() {
  yield takeEvery('SELECT_POSTS', handleSelect)
}

export function* handleSelect(action) {
  yield console.log(action.payload.e.shiftKey)
  if (action.payload.e.shiftKey) {
    yield put({type: 'SHIFT_TOGGLE', payload: action.payload })
  }
  else if (action.payload.e.ctrlKey) {
    yield put({type: 'CTRL_TOGGLE', payload: action.payload })
  }
  else {
    yield put({type: 'TOGGLE_POST', payload: action.payload.id })
  }
}

export default function* rootSaga() {
  yield all([
    watchSelect(),
    watchPosts()
  ])
}
