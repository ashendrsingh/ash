import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from '../redux/Constants';
import { toast } from 'react-toastify';

export const login = (email, password) => async (dispatch) => {
  try {

    const { data } = await axios.post("http://localhost:4000/api/auth/login", { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    localStorage.setItem('token', data.token);
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: LOGIN_FAIL, payload: errorMessage });
    toast.error(errorMessage);
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const result = await axios.post('http://localhost:4000/api/auth/register', formData);
    dispatch({ type: REGISTER_SUCCESS, payload: result.data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: REGISTER_FAIL,
      payload: errorMessage
    });
    toast.error(errorMessage);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
