import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { AuthType } from "../action-types/auth";
import { Action } from "../actions";
import { AuthAction } from "../actions/auth";


const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const loadUser = () => async(dispatch: Dispatch<AuthAction>) => {
  try {
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }
    //Getting user info -> email
    const {data: {data: responseAuth}} = await axios.get('/api/auth');
    dispatch({
      type: AuthType.USER_LOADED,
      payload: responseAuth
    })
  } catch (err) {
    dispatch({
      type: AuthType.AUTH_ERROR,
    })
  }
}

export const auth = (email: string, password: string) => async(dispatch: Dispatch<AuthAction | Action>) => {
  const body = JSON.stringify({email,password});
  try {
    //Getting token from backend
    const {data: {data: token}} = await axios.post('/api/auth',body,config);
    // console.log("responseAuth: ", token)
    dispatch({
      type: AuthType.LOGIN_SUCCESS,
      payload: token
    })
    setAuthToken(token);
    const mydispatch = useDispatch();
    mydispatch(loadUser());
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      const errors = error.response.data.errors;
      // if(errors){
      //   errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      // }
      dispatch({
        type: AuthType.LOGIN_FAIL,
      })
    }
  }
};

export const logout = () => async(dispatch: Dispatch<AuthAction | Action>) => {
  dispatch({type: AuthType.LOGOUT});
}