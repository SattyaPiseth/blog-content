// src/redux/reducer.js
import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
  } from "./actionTypes";
  
  const initialState = {
    loading: false,
    profile: null,
    error: null
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_PROFILE_SUCCESS:
        return { ...state, loading: false, profile: action.payload };
      case UPDATE_PROFILE_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default profileReducer;
  