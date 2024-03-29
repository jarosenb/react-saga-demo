import "@testing-library/jest-dom/extend-expect";
import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { Router, Route, useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";

import PostsListing from "./PostsListing";

const mockStore = configureStore();

const mockPosts = [
  { data: { title: "post 1" } },
  { data: { title: "post 2" } }
];

const renderComponent = (store, history) => {
  return render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/:id" children={<PostsListing />} />
      </Router>
    </Provider>
  );
};
describe("posts-listing", () => {
  it("renders post content", () => {
    const store = mockStore({ listing: { posts: mockPosts, loading: false, err: false } });

    const history = createMemoryHistory();
    history.push("/all");

    const { getByText, getAllByRole, getByTestIdm, debug } = renderComponent(
      store,
      history
    );
    
    expect(getByText(/ID:/).textContent).toBe("ID: all")
    expect(store.getActions()).toEqual([{ type: "GET_POSTS", payload: "all" }]);
    const renderedTitles = getAllByRole("listitem").map(x => x.textContent);
    expect(renderedTitles).toEqual(["post 1", "post 2"]);
  });

  it("shows loading if loading", () => {
    const store = mockStore({ listing: { posts: [], loading: true, err: false } });
    const history = createMemoryHistory();
    history.push("/all");

    const { getByText } = renderComponent(
      store,
      history
    );

    expect(getByText(/^loading...$/)).toBeDefined();
  });

  it("shows error if error", () => {
    const store = mockStore({ listing: { posts: [], loading: false, err: true } });
    const history = createMemoryHistory();
    history.push("/all");

    const { getByText } = renderComponent(
      store,
      history
    );

    expect(getByText(/^There was an error!$/)).toBeDefined();
  });
});
