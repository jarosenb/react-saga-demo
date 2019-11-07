import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import configureStore from "redux-mock-store";
import App from "./App";
import { Provider } from "react-redux";
import assert from "assert";
import reactRouter from "react-router-dom";

const mockStore = configureStore();

it("mock router state", () => {
  const { getByRole, getByTestId } = render(
    <Provider store={mockStore({ listing: {posts: [] }})}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
});
