// src/redux/actions.js
import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
  } from "./actionTypes";
  
  export const updateProfile = (profileData, token) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    const raw = JSON.stringify(profileData);
  
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    try {
      const response = await fetch("https://blog-api.automatex.dev/users/profile", requestOptions);
      const result = await response.json();
  
      if (response.ok) {
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: result });
      } else {
        dispatch({ type: UPDATE_PROFILE_FAILURE, error: result });
      }
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAILURE, error: error.message });
    }
  };
  