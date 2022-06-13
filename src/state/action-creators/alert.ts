import { Dispatch } from "react";
import uuid from "react-uuid";
import { AlertType } from "../action-types/alert";
import { Action } from "../actions";
import { AlertAction, ToastTypes } from "../actions/alert";

export const setAlert = (msg: string, alertType: ToastTypes) => (dispatch: Dispatch<AlertAction | Action>) => {
  const id = uuid();
  dispatch({
    type: AlertType.SET_ALERT,
    payload: { msg, alertType, id },
  });
  // setTimeout(() => {
  //   dispatch({ type: AlertType.REMOVE_ALERT, payload: id });
  // }, timeout);
};

export const removeAlert = (id: string) => (dispatch: Dispatch<AlertAction | Action>) => {
  dispatch({ type: AlertType.REMOVE_ALERT, payload: id });
};