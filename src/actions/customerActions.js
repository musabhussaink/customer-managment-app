// actions/customerActions.js
import axios from 'axios';
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
  CUSTOMER_DELETE_FAIL
} from '../constants/customerConstants';

export const listCustomers = (page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc') => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });

    const response = await axios.get(`http://localhost:3001/api/customers?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
    const customers = response.data.customers;

    function createData(id, username, name, email, image) {
      return { id, username, name, email, image };
    }
    const customersData = [];
    // Process the fetched customers (e.g., display in a list)
    customers.forEach((customer) => {
      const { _id, name, username, email, profilePicture } = customer;

      // Option 1: Build the image URL based on the filename and a base URL (if applicable)
      const imageUrl = profilePicture ? `http://localhost:3001/uploads/${profilePicture}` : null;

      // Option 2: Use a placeholder image if no profile picture exists
      const placeholderImageUrl = 'https://via.placeholder.com/150';

      // Add the customer to the list of rows
      customersData.push(createData(_id, username, name, email, imageUrl || placeholderImageUrl));
    });

    dispatch({
      type: CUSTOMER_LIST_SUCCESS,
      payload: customersData,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const createCustomers = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_CREATE_REQUEST });

    const response = await axios.post(`http://localhost:3001/api/customers`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Required for file uploads
      },
    });

    dispatch({
      type: CUSTOMER_CREATE_SUCCESS,
      payload: response.data,
    });
    dispatch(listCustomers());
  } catch (error) {
    dispatch({
      type: CUSTOMER_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    // setErrorMessage('Error creating customer. Please try again.');
  }
}

export const updateCustomers = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_UPDATE_REQUEST });

    const response = await axios.put(`http://localhost:3001/api/customers/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Required for file uploads
      },
    });
    dispatch({
      type: CUSTOMER_UPDATE_SUCCESS,
      payload: response.data,
    });
    dispatch(listCustomers());
  } catch (error) {
    dispatch({
      type: CUSTOMER_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

export const deleteCustomers = (id) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_DELETE_REQUEST });

    await axios.delete(`http://localhost:3001/api/customers/${id}`);
    dispatch({
      type: CUSTOMER_DELETE_SUCCESS,
    });
    dispatch(listCustomers());
  } catch (error) {
    dispatch({
      type: CUSTOMER_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}