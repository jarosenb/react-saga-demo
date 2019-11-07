import "@testing-library/jest-dom/extend-expect";
import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";

import Navbar, { NavButton } from "./Navbar";

const mockStore = configureStore();
const store = mockStore({ posts: [] });

function renderComponent(component, store, history) {
  return render(
    <Provider store={store}>
      <Router history={history}>{component}</Router>
    </Provider>
  );
}

describe("navbar", () => {

  it("Check buttons get class from state", () => {
    const history = createMemoryHistory();
    const { getByText } = renderComponent(
      <Navbar />,
      store,
      history
    );
    history.push('/all')
    expect(getByText(/All$/).className).toBe("btn btn-primary btn-block");
    expect(getByText(/Popular$/).className).toBe("btn btn-secondary btn-block");
    expect(getByText(/Aww$/).className).toBe("btn btn-secondary btn-block");
  });

  it("NavButton is active when active=true", () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, baseElement } = renderComponent(
      <NavButton active={true} dest={"/all"} title={"All"} />,
      store,
      history
    );

    const button = getByRole("button");
    expect(button).toHaveTextContent("All");
    expect(button).toHaveClass("btn-primary");
  });

  it("NavButton is inactive when active=false", () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, baseElement } = renderComponent(
      <NavButton active={false} dest={"/all"} title={"All"} />,
      store,
      history
    );

    const button = getByRole("button");
    expect(button).toHaveTextContent("All");
    expect(button).toHaveClass("btn-secondary");
  });

  it("NavButton changes state when clicked", () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, baseElement } = renderComponent(
      <NavButton active={true} dest={"/all"} title={"All"} />,
      store,
      history
    );

    fireEvent.click(getByRole("button"));
    expect(history.location.pathname).toBe('/all')
  });
});
