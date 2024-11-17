import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
  } from '../Constants';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null,
  };
  
  export default function authReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          token: payload,
          isAuthenticated: true,
          loading: false,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          data:payload
        };
      case LOGIN_FAIL:
      case REGISTER_FAIL:
      case LOGOUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: payload,
        };
      default:
        return state;
    }
  }
  