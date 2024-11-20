// src/redux/blogActions.js

// Action Types for Search
export const SEARCH_BLOG_REQUEST = 'SEARCH_BLOG_REQUEST';
export const SEARCH_BLOG_SUCCESS = 'SEARCH_BLOG_SUCCESS';
export const SEARCH_BLOG_FAILURE = 'SEARCH_BLOG_FAILURE';

// Action Types for Filter
export const FILTER_BLOG_REQUEST = 'FILTER_BLOG_REQUEST';
export const FILTER_BLOG_SUCCESS = 'FILTER_BLOG_SUCCESS';
export const FILTER_BLOG_FAILURE = 'FILTER_BLOG_FAILURE';

// Search Blog Action
export const searchBlog = (title) => async (dispatch) => {
  dispatch({ type: SEARCH_BLOG_REQUEST });

  try {
    const response = await fetch(`https://blog-api.automatex.dev/blogs?title=${title}`);
    const data = await response.json();

    dispatch({
      type: SEARCH_BLOG_SUCCESS,
      payload: data, // Dispatch the blog data
    });
  } catch (error) {
    dispatch({
      type: SEARCH_BLOG_FAILURE,
      payload: error.message,
    });
  }
};

// Filter Blog Action
// src/redux/blogActions.js
export const filterBlog = (categoryId) => async (dispatch) => {
    dispatch({ type: "FILTER_BLOG_REQUEST" });
  
    try {
      const response = await fetch(`https://blog-api.automatex.dev/blogs?category_id=${categoryId}`);
      const data = await response.json();
  
      dispatch({
        type: "FILTER_BLOG_SUCCESS",
        payload: data, // Dispatch the filtered blog data
      });
    } catch (error) {
      dispatch({
        type: "FILTER_BLOG_FAILURE",
        payload: error.message,
      });
    }
  };
  
