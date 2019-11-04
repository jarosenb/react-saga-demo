import { combineReducers } from "redux";

const counter = function(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "INCREMENT_WITH_PAYLOAD":
      return state + action.payload;
    default:
      return state;
  }
};

const formField = function(state = 0, action) {
  switch (action.type) {
    case "FORMFIELD_UPDATE":
      return parseInt(action.payload);
    default:
      return state;
  }
};

const spinner = function(state = false, action) {
  switch (action.type) {
    case "SHOW_SPINNER":
      return true;
    case "HIDE_SPINNER": 
      return false;
    default:
      return state;
  }
};

const posts = function(state = [], action) {
  switch(action.type) {
    case "ADD_POSTS": 
      return action.payload;
    case "FLUSH_POSTS":
      return [];
    default:
      return state;
  }
}

export default combineReducers({ counter, formField, spinner, posts });
