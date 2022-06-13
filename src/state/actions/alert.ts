import { AlertType } from "../action-types/alert";

export type ToastTypes = "info" | "warning" | "success" | "error"

export interface Alert {
  id: string,
  msg: string,
  alertType: ToastTypes
}

export interface AlertState {
  alerts: Alert[]
}

interface SetAlertAction {
  type: AlertType.SET_ALERT,
  payload: Alert
}

interface RemoveAlertAction {
  type: AlertType.REMOVE_ALERT,
  payload: string
}

export type AlertAction = SetAlertAction | RemoveAlertAction;