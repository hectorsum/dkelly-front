import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { OrderType } from "../action-types/order";
import { Action, Error } from "../actions";
import { AlertAction } from "../actions/alert";
import { Order, OrderAction } from "../actions/order";
import { setAlert } from "./alert";

interface OrderResponse {
  ok: boolean,
  data: Array<Order> | Order,
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export const getOrders = () => async(dispatch: Dispatch<OrderAction | Action>) => {
  dispatch({
    type: OrderType.CLEAR_ORDERS,
  })
  try {
    const {data:{data: orderResponse}} = await axios.get("/api/order", config);
    dispatch({
      type: OrderType.RETRIEVE_ALL_ORDERS,
      payload: orderResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: OrderType.ERROR_ORDER,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const getSingleOrder = (id: string) => async (dispatch: Dispatch<OrderAction | Action>) => {
  try {
    const {data:{data: orderResponse}} = await axios.get(`/api/order/${id}`, config);
    dispatch({
      type: OrderType.RETRIEVE_SINGLE_ORDER,
      payload: orderResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: OrderType.ERROR_ORDER,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const addOrder = (formData: Order) => async(dispatch: Dispatch<OrderAction | Action | any>) => {
  try {
    const {data:{data: orderResponse}} = await axios.post('/api/order',formData ,config);
    dispatch({
      type: OrderType.ADD_ORDER,
      payload: orderResponse
    })
    dispatch(setAlert("Orden Creada Satisfactoriamente", "success"));
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: OrderType.ERROR_ORDER,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const updateOrder = (id: string, formData: Order) => async(dispatch: Dispatch<OrderAction | Action | any>) => {
  try {
    let {data:{data: orderResponse}} = await axios.put(`/api/order/${id}`,formData ,config);
    dispatch({
      type: OrderType.EDIT_ORDER,
      payload: orderResponse,
    })
    dispatch(setAlert("Orden Actualizada Satisfactoriamente", "warning"));
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: OrderType.ERROR_ORDER,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const deleteOrder = (id: string) => async(dispatch: Dispatch<OrderAction | Action>) => {
  try {
    await axios.delete(`/api/order/${id}`,config);
    dispatch({
      type:OrderType.DELETE_ORDER,
      payload: id
    });
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: OrderType.ERROR_ORDER,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const confirmPayment = (id: string) => async(dispatch: Dispatch<OrderAction | Action | any>) => {
  try {
    const {data:{data: orderResponse}} = await axios.put(`/api/order/payment/${id}`,config);
    dispatch({
      type:OrderType.CONFIRM_PAYMENT,
      payload: orderResponse
    });
    dispatch(setAlert("Pago confirmado!", "success"));
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: OrderType.ERROR_ORDER,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}