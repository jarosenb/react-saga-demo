import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import "./App.css";

import PostsListing from "../PostsListing/PostsListing";
import Navbar from "../Navbar/Navbar";

function App() {
  return (
    <div className="container App">
      Welcome to the App
      <div className="row">
        <div className="col-md-3">
          <Navbar />
        </div>
        <div className="col-md-9">
          <Switch>
            <Route exact path="/">
              {" "}
              <Redirect to="/hello"></Redirect>{" "}
            </Route>
            <Route path="/:id" children={<PostsListing />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
