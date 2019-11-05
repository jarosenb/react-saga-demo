import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import PostsListing from "../PostsListing/PostsListing";
import Navbar from "../Navbar/Navbar";

function App() {
  return (
    <div className="container App">
      <div className="row">
        <div className="col-md-3">
          <Navbar />
        </div>
        <div className="col-md-9">
          <Switch>
            <Route exact path="/">
              {" "}
              <Redirect to="/all"></Redirect>{" "}
            </Route>
            <Route path="/:id" children={<PostsListing />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
