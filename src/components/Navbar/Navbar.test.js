jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn()
}));
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";

import Navbar, { NavButton } from "./Navbar";

const mockStore = configureStore();
const store = mockStore({ posts: [] });

describe("navbar", () => {
  afterEach(() => {
    useHistory.mockReset();
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    const history = createMemoryHistory();
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Check buttons get class from state", () => {
    useHistory.mockImplementation(
      jest.requireActual("react-router-dom").useHistory
    );
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>
    );
    fireEvent.click(getByText(/All$/));
    expect(getByText(/All$/).className).toBe("btn btn-primary btn-block");
    expect(getByText(/Popular$/).className).toBe("btn btn-secondary btn-block");
    expect(getByText(/Aww$/).className).toBe("btn btn-secondary btn-block");
  });

  it("NavButton renders correctly", () => {
    const mock_push = jest.fn();
    useHistory.mockReturnValue({ push: mock_push });

    const history = createMemoryHistory();
    const { getByText, getByRole, baseElement } = render(
      <Provider store={store}>
        <Router history={history}>
          <NavButton active={true} dest={"/all"} title={"All"} />
        </Router>
      </Provider>
    );

    const button = getByRole("button");
    expect(button).toHaveTextContent("All");
    expect(button).toHaveClass("btn-primary");

    fireEvent.click(getByRole("button"));
    expect(mock_push).toBeCalledWith("/all");
  });
});
