import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom'



function PostsListing() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  let location = useLocation();
  const dispatch = useDispatch();

  const loadingState = useSelector(state => state.listing.loading)
  const posts = useSelector(state => state.listing.posts)
  const showError = useSelector(state => state.listing.err)

  useEffect(() => {
    dispatch({type: "GET_POSTS", payload: id})
  }, [location, dispatch, id])

  if(loadingState){
    return <div>loading...</div>
  } else if(showError) {
    return <div>There was an error!</div>
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