// reducer.js
import { SEARCH_BLOGS } from "../actionTypes";

const initialState = {
  blogs: [],
  searchResults: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BLOGS:
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducer;
