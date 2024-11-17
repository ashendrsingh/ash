import axios from 'axios';
import {
  GET_LEADS_SUCCESS,
  GET_LEADS_FAIL,
  CREATE_LEAD_SUCCESS,
  CREATE_LEAD_FAIL,
  UPDATE_LEAD_SUCCESS,
  UPDATE_LEAD_FAIL,
  DELETE_LEAD_SUCCESS,
  DELETE_LEAD_FAIL
} from '../redux/Constants.js';
import { toast } from 'react-toastify';
export const getLeads = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get('http://localhost:4000/api/leads', config);
    dispatch({ type: GET_LEADS_SUCCESS, payload: data });
    toast.success('Lead Add successful!');
  } catch (error) {
    dispatch({
      type: GET_LEADS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const createLead = (leadData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('http://localhost:4000/api/leads', leadData, config);
    dispatch({ type: CREATE_LEAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_LEAD_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const updateLead = (leadData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(`http://localhost:4000/api/leads/${leadData._id}`, leadData,config);
    dispatch({
      type: UPDATE_LEAD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LEAD_FAIL,
      payload: error.response?.data?.message || 'Failed to update lead',
    });
  }
};



export const deleteLead = (leadId) => async (dispatch) => {
  try {
    const result = await axios.delete(`http://localhost:4000/api/leads/${leadId}`);
    dispatch({
      type: DELETE_LEAD_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LEAD_FAIL,
      payload: error.response?.data?.message || 'Failed to delete lead',
    });
  }
};