import { AlertType } from "../action-types/alert";
import { Alert, AlertAction, AlertState } from "../actions/alert";

const initialState: AlertState = {
  alerts: [],
};

const reducer = (state: AlertState = initialState, action: AlertAction) => {
  switch (action.type) {
    case AlertType.SET_ALERT:
      return { ...state, alerts: [action.payload, ...state.alerts] };
    case AlertType.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert: Alert) => alert.id !== action.payload),
      };
    default:
      return state;
  }
}

export default reducer;