import { combineReducers } from "redux";

const initialListingState = {
  loading: false,
  err: false,
  posts: []
}

const listing = function(state = initialListingState, action) {
  switch(action.type) {
    case "FETCH_POSTS_START": 
      return {
        loading: true,
        err: false,
        posts: []
      }
    case "FETCH_POSTS_SUCCESS":
      return {
        loading: false,
        err: false,
        posts: action.payload
      };
    case "FETCH_POSTS_FAILURE":
      return {
        loading: false,
        err: true,
        posts: []
      }
    default:
      return state;
  }
}

export default combineReducers({ listing });
