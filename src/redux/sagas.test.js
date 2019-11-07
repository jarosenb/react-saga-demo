jest.mock("redux-saga/effects", () => ({
  ...jest.requireActual("redux-saga/effects"),
  takeLatest: jest.fn()
}));
import { runSaga } from "redux-saga";
import { put, call, takeLatest } from "redux-saga/effects";
import { watchPosts, getPosts, fetchData } from "./sagas";
import fetchMock from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import * as matchers from "redux-saga-test-plan/matchers";

describe("sagas", () => {
  afterEach(() => {
    takeLatest.mockReset();
    fetchMock.reset();
  });

  it("test getPosts with 200", async () => {
    fetchMock.mock(`https://www.reddit.com/r/all.json`, {
      body: { data: { children: [{ data: { title: "title1" } }] } },
      status: 200
    });
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action)
      },
      getPosts,
      { type: "GET_POSTS", payload: "all" }
    ).toPromise();
  });

  it("test getPosts with 404", async () => {
    fetchMock.mock(`https://www.reddit.com/r/asdfasdfasdf.json`, 404);
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action)
      },
      getPosts,
      { type: "GET_POSTS", payload: "asdfasdfasdf" }
    ).toPromise();
  });

  it("test takeEvery using actual implementation", () => {
    const dispatched = [];
    takeLatest.mockImplementation(
      jest.requireActual("redux-saga/effects").takeLatest
    );
    const gen = watchPosts();
    const genval = gen.next().value;
    expect(genval).toEqual(takeLatest("GET_POSTS", getPosts));
  });

  it("test takeEvery using dummy implementation", async () => {
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action)
      },
      watchPosts
    ).toPromise();
    expect(takeLatest).toBeCalledWith("GET_POSTS", getPosts);
  });

  it("test watch", async () => {
    const saga = await expectSaga(watchPosts)
      .provide([[matchers.call.fn(fetchData), throwError()]])
      .dispatch({type: 'GET_POSTS'})
      .run();
    console.log(saga)
  });

  it("test failure using redux-saga-test-plan", async () => {
    expectSaga(getPosts, { type: "GET_POSTS", payload: "all" })
      .provide([[matchers.call.fn(fetchData), throwError()]])
      .call(fetchData, 'https://www.reddit.com/r/all.json')
      .put({ type: "FETCH_POSTS_START" })
      .put({ type: "FETCH_POSTS_FAILURE" })
      .run();
  });

  it("test success using redux-saga-test-plan", async () => {
    const saga =  expectSaga(getPosts, { type: "GET_POSTS", payload: "all" })
      .provide([[matchers.call.fn(fetchData), [{ data: { title: "title" } }]]])
      .call(fetchData, 'https://www.reddit.com/r/all.json')
      .put({ type: "FETCH_POSTS_START" })
      .put({
        type: "FETCH_POSTS_SUCCESS",
        payload: [{ data: { title: "title" } }]
      })
      .run();
  });
});
