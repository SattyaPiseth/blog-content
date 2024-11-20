import { LIKE_BLOG_REQUEST, LIKE_BLOG_SUCCESS, LIKE_BLOG_FAILURE, SEARCH_BLOGS } from '../actionTypes';

const initialState = {
  loading: false,
  blogs: [], // Assuming you're storing your blogs here
  searchResults: [], // For storing search results
  error: null,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handling like blog actions
    case LIKE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIKE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.map((blog) =>
          blog.id === action.payload ? { ...blog, liked: true } : blog
        ),
      };
    case LIKE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Handling search blog actions
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
