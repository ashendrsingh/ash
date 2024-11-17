import {
  GET_LEADS_SUCCESS,
  GET_LEADS_FAIL,
  CREATE_LEAD_SUCCESS,
  CREATE_LEAD_FAIL,
  UPDATE_LEAD_SUCCESS,
  UPDATE_LEAD_FAIL,
  DELETE_LEAD_SUCCESS,
  DELETE_LEAD_FAIL,
} from '../Constants';

const initialState = {
  leads: [],
  error: null,
};

export default function leadReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEADS_SUCCESS:
      return {
        ...state,
        leads: payload,
      };
    case CREATE_LEAD_SUCCESS:
      return {
        ...state,
        leads: [...state.leads, payload],
      };
    case GET_LEADS_FAIL:
    case CREATE_LEAD_FAIL:
      return {
        ...state,
        error: payload,
      };
    case DELETE_LEAD_SUCCESS:
      return {
        ...state,
        leads: payload,
      };
    case DELETE_LEAD_FAIL:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_LEAD_SUCCESS:
      return {
        ...state,
        leads: payload
      };
    case UPDATE_LEAD_FAIL:
      return {
        ...state,
        error: payload,
      };


    default:
      return state;
  }
}
