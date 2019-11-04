import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom'



function PostsListing() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  let location = useLocation();
  const dispatch = useDispatch();
  const spinnerState = useSelector(state => state.spinner)
  const posts = useSelector(state => state.posts)

  useEffect(() => {
    dispatch({type: "GET_POSTS", payload: id})
  }, [location, dispatch, id])

  if(spinnerState){
    return <div>loading...</div>
  }
  return (
    <div>
      <h3>ID: {id}</h3>
      <ul>
      { posts.map((post, key) => <li key={ key }>{ post.data.title }</li>)}
      </ul>
    </div>
  );
}

export default PostsListing