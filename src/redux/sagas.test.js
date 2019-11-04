jest.mock("redux-saga/effects", () => ({
  ...jest.requireActual("redux-saga/effects"),
  takeLatest: jest.fn()
}));
import { runSaga } from "redux-saga";
import { put, call, takeLatest } from "redux-saga/effects";
import { watchPosts, getPosts } from "./sagas";
import fetchMock from "fetch-mock";
import assert from "assert";

describe("sagas", () => {
  afterEach(() => {
    takeLatest.mockReset();
  });

  it("has a test", async () => {
    fetchMock.mock(`https://www.reddit.com/r/all.json`, {
      body: { data: {children: []} },
      status: 200
    });
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action)
      },
      getPosts, {type: 'GET_POSTS', payload: 'all'}
    ).toPromise();
  });

  
  it("test takeEvery using actual implementation", () => {
    const dispatched = [];
    takeLatest.mockImplementation(() =>
      jest.requireActual("redux-saga/effects")
    );
    const gen = watchPosts();
    const genval = gen.next().value;

    assert.deepEqual(genval, takeLatest("GET_POSTS", getPosts));
  });

  it("test takeEvery using dummy implementation", async () => {
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action)
      },
      watchPosts
    ).toPromise();  
    expect(takeLatest).lastCalledWith("GET_POSTS", getPosts)
  });
});

