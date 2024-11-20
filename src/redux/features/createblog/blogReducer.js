// src/redux/blogReducer.js
import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  SEARCH_BLOG_REQUEST,
  SEARCH_BLOG_SUCCESS,
  SEARCH_BLOG_FAILURE,
  FILTER_BLOG_REQUEST,
  FILTER_BLOG_SUCCESS,
  FILTER_BLOG_FAILURE
} from './blogActions';

const initialState = {
  loading: false,
  blogs: [],
  filteredBlogs: [],
  searchResults: [],
  error: '',
};

// Blog Reducer
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
    case SEARCH_BLOG_REQUEST:
    case FILTER_BLOG_REQUEST:
      return { ...state, loading: true };

    case FETCH_BLOGS_SUCCESS:
      return { ...state, loading: false, blogs: action.payload };

    case SEARCH_BLOG_SUCCESS:
      return { ...state, loading: false, searchResults: action.payload };

    case FILTER_BLOG_SUCCESS:
      return { ...state, loading: false, filteredBlogs: action.payload };

    case FETCH_BLOGS_FAILURE:
    case SEARCH_BLOG_FAILURE:
    case FILTER_BLOG_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default blogReducer;
