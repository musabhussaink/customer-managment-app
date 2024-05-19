import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DELETE_FAIL,
} from '../constants/customerConstants';

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_LIST_REQUEST:
      return { ...state, loading: true, customers: [] };
    case CUSTOMER_LIST_SUCCESS:
      return { ...state, loading: false, customers: action.payload };
    case CUSTOMER_LIST_FAIL:
    case CUSTOMER_CREATE_FAIL:
    case CUSTOMER_UPDATE_FAIL:
    case CUSTOMER_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CUSTOMER_CREATE_REQUEST:
    case CUSTOMER_UPDATE_REQUEST:
    case CUSTOMER_DELETE_REQUEST:
      return { ...state, loading: true, error: null };
    case CUSTOMER_CREATE_SUCCESS:
    case CUSTOMER_UPDATE_SUCCESS:
    case CUSTOMER_DELETE_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default customerReducer;