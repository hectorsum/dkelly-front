import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { ProductType } from "../action-types/products";
import { Action } from "../actions";
import { Product, ProductAction } from "../actions/product";
import { setAlert } from "./alert";

interface ProductResponse {
  ok: boolean,
  data: Array<Product> | Product,
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export const getProducts = () => async(dispatch: Dispatch<ProductAction | Action>) => {
  dispatch({
    type: ProductType.CLEAR_PRODUCTS,
  })
  try {
    const {data: {data: productResponse}} = await axios.get("/api/product", config);
    dispatch({
      type: ProductType.RETRIEVE_ALL_PRODUCTS,
      payload: productResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ProductType.ERROR_PRODUCT,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const getSingleProduct = (id: string) => async (dispatch: Dispatch<ProductAction | Action>) => {
  try {
    const {data: {data: productResponse}} = await axios.get(`/api/product/${id}`, config);
    dispatch({
      type: ProductType.RETRIEVE_SINGLE_PRODUCT,
      payload: productResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: ProductType.ERROR_PRODUCT,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const addProduct = (formData: Product) => async(dispatch: Dispatch<ProductAction | Action | any>) => {
  try {
    const {data:{data: productResponse}} = await axios.post('/api/product',formData ,config);
    console.log("res: ",productResponse);
    dispatch({
      type: ProductType.ADD_PRODUCT,
      payload: productResponse
    })
    dispatch(setAlert("Producto agregado", "success"));
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ProductType.ERROR_PRODUCT,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const updateProduct = (id: string, formData: Product) => async(dispatch: Dispatch<ProductAction | Action | any>) => {
  try {
    let {data:{data: productResponse}} = await axios.put(`/api/product/${id}`,formData ,config);
    dispatch({
      type: ProductType.EDIT_PRODUCT,
      payload: productResponse,
    })
    dispatch(setAlert("Producto actualizado", "warning"));
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: ProductType.ERROR_PRODUCT,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const deleteProduct = (id: string) => async(dispatch: Dispatch<ProductAction | Action | any>) => {
  try {
    await axios.delete(`/api/product/${id}`,config);
    dispatch({
      type:ProductType.DELETE_PRODUCT,
      payload: id
    });
    dispatch(setAlert("Producto eliminado", "error"));
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ProductType.ERROR_PRODUCT,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}