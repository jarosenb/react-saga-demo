import { combineReducers } from "redux";

const initialListingState = {
  loading: false,
  err: false,
  posts: [],
  selectedPosts: []
};

const listing = function(state = initialListingState, action) {
  switch (action.type) {
    case "FETCH_POSTS_START":
      return {
        loading: true,
        err: false,
        posts: []
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        loading: false,
        err: false,
        posts: action.payload.map(post => ({ ...post, selected: false })),
        selectedPosts: []
      };
    case "FETCH_POSTS_FAILURE":
      return {
        loading: false,
        err: true,
        posts: []
      };
    case "TOGGLE_POST":
      return {
        ...state,
        posts: state.posts.map(post =>
          post.data.id === action.payload
            ? { ...post, selected: true }
            : { ...post, selected: false }
        )
      };
    case "SHIFT_TOGGLE":
      const firstSelected = state.posts.reduce(
        (firstSelected, currentValue, currentIndex) =>
          currentValue.selected && firstSelected < 0
            ? currentIndex
            : firstSelected,
        -1
      );
      const lastSelected = state.posts.reduce(
        (lastSelected, currentValue, currentIndex) =>
          currentValue.selected ? currentIndex : lastSelected,
        -1
      );
      
      let lbound, rbound;
      if (action.payload.key < firstSelected) {
        [lbound, rbound] = [action.payload.key, lastSelected]
      }
      else if (action.payload.key > firstSelected && action.payload.key < lastSelected) {
        [lbound, rbound] = [firstSelected, action.payload.key]
      }
      else {
        [lbound, rbound] = [lastSelected, action.payload.key]
      }

      return {
        ...state,
        posts: state.posts.map((post, key) =>
          key >= lbound && key <= rbound
            ? { ...post, selected: true }
            : post
        )
      
      }
    case "CTRL_TOGGLE":
      return {
        ...state,
        posts: state.posts.map(post =>
          post.data.id === action.payload.id
            ? { ...post, selected: !post.selected }
            : post
        )
      };
    case "DESELECT_ALL":
      return {
        ...state,
        posts: state.posts.map(post => ({ ...post, selected: false }))
      };
    default:
      return state;
  }
};

export default combineReducers({ listing });
