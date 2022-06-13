import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { CustomerType } from "../action-types/customer";
import { Action } from "../actions";
import { Customer, CustomerAction } from "../actions/customer";
import { setAlert } from "./alert";

interface CustomerResponse {
  ok: boolean,
  data: Array<Customer> | Customer,
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export const getCustomers = () => async(dispatch: Dispatch<CustomerAction | Action>) => {
  dispatch({
    type: CustomerType.CLEAR_CUSTOMERS,
  })
  try {
    const {data:{data: customerResponse}} = await axios.get("/api/customer", config);
    dispatch({
      type: CustomerType.RETRIEVE_ALL,
      payload: customerResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: CustomerType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const getSingleCustomer = (id: string) => async (dispatch: Dispatch<CustomerAction | Action>) => {
  try {
    const {data:{data: customerResponse}} = await axios.get(`/api/customer/${id}`, config);
    dispatch({
      type: CustomerType.RETRIEVE_SINGLE_CUSTOMER,
      payload: customerResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: CustomerType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const addCustomer = (formData: Customer) => async(dispatch: Dispatch<CustomerAction | Action | any>) => {
  try {
    console.log("formData: ",formData);
    const {data:{data: customerResponse}} = await axios.post('/api/customer',formData ,config);
    dispatch({
      type: CustomerType.ADD,
      payload: customerResponse
    })
    dispatch(setAlert("Cliente agregado", "success"));
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: CustomerType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const updateCustomer = (id: string, formData: Customer) => async(dispatch: Dispatch<CustomerAction | Action | any>) => {
  try {
    let {data:{data: customerResponse}} = await axios.put(`/api/customer/${id}`,formData ,config);
    dispatch({
      type: CustomerType.EDIT,
      payload: customerResponse,
    })
    dispatch(setAlert("Cliente actualizado", "warning"));
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: CustomerType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const deleteCustomer = (id: string) => async(dispatch: Dispatch<CustomerAction | Action | any>) => {
  try {
    await axios.delete(`/api/customer/${id}`,config);
    dispatch({
      type:CustomerType.DELETE,
      payload: id
    });
    dispatch(setAlert("Cliente actualizado", "error"));
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: CustomerType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}