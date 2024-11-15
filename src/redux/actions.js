// actions.js
import { SEARCH_BLOGS } from "./actionTypes";

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
