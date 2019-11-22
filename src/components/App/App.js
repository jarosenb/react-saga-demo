import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import "./App.css";

import PostsListing from "../PostsListing/PostsListing";
import Navbar from "../Navbar/Navbar";

function Redirector() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'REDIRECT', payload: {history: history}})
  })

  return (
    <div>what</div>
  )

}

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
              <Redirector />
            </Route>
            <Route path="/:id" children={<PostsListing />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
