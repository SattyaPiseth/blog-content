import { LIKE_BLOG_REQUEST, LIKE_BLOG_SUCCESS, LIKE_BLOG_FAILURE, SEARCH_BLOGS } from './actionTypes';
import { BOOKMARK_BLOG_REQUEST, BOOKMARK_BLOG_SUCCESS, BOOKMARK_BLOG_FAILURE } from './actionTypes';

// Like blog actions
export const likeBlogRequest = () => ({
  type: LIKE_BLOG_REQUEST,
});

export const likeBlogSuccess = (blogId) => ({
  type: LIKE_BLOG_SUCCESS,
  payload: blogId,
});

export const likeBlogFailure = (error) => ({
  type: LIKE_BLOG_FAILURE,
  payload: error,
});

export const likeBlog = (blogId) => {
  return (dispatch) => {
    dispatch(likeBlogRequest());

    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(`https://blog-api.automatex.dev/blogs/${blogId}/like`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        dispatch(likeBlogSuccess(blogId));
        console.log(result);
      })
      .catch((error) => {
        dispatch(likeBlogFailure(error));
        console.error(error);
      });
  };
};

// Search blogs action
export const searchBlogs = (searchTerm) => async (dispatch) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://blog-api.automatex.dev/blogs?title=${searchTerm}`,
      requestOptions
    );
    const result = await response.json(); // Assuming response is JSON
    dispatch({
      type: SEARCH_BLOGS,
      payload: result,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};
// Bookmark blog actions
export const bookmarkBlog = (blogId) => {
  return async (dispatch) => {
    dispatch({ type: BOOKMARK_BLOG_REQUEST });

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2QxNjk1OGMtNmI0Yi00NTVkLTkzNWItOTJhYjQxOTY0ZmNiIiwiZXhwIjoxNzMxMDgzNDA0fQ.BOVxStTYLpnbVuaRxIBvSCjhGJLxmPq3d8iRwfC55Zw");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://blog-api.automatex.dev/blogs/${blogId}/bookmark`,
        requestOptions
      );
      const result = await response.json();

      if (response.ok) {
        dispatch({ type: BOOKMARK_BLOG_SUCCESS, payload: result });
      } else {
        dispatch({ type: BOOKMARK_BLOG_FAILURE, error: result });
      }
    } catch (error) {
      dispatch({ type: BOOKMARK_BLOG_FAILURE, error });
    }
  };
};