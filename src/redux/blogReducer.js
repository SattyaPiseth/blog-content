// src/redux/blogActions.js
export const searchBlog = (title) => async (dispatch) => {
  dispatch({ type: "SEARCH_BLOG_REQUEST" });

  try {
    const response = await fetch(`https://blog-api.automatex.dev/blogs?title=${title}`);
    const data = await response.json();

    dispatch({
      type: "SEARCH_BLOG_SUCCESS",
      payload: data, // Dispatch the blog data
    });
  } catch (error) {
    dispatch({
      type: "SEARCH_BLOG_FAILURE",
      payload: error.message,
    });
  }
};

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
