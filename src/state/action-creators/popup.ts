import { Dispatch } from "react";
import { PopupType } from "../action-types/popup";
import { Action } from "../actions";
import { Popup, PopupAction } from "../actions/popup";

export const setIsEditing = ({idSelected, isOpen}: Popup) => (dispatch: Dispatch<PopupAction | Action>) => {
  dispatch({
    type: PopupType.SET_EDIT,
    payload: {
      idSelected,
      isOpen
    }
  });
};

export const setIsConfirming = ({idSelected, isOpen}: Popup) => (dispatch: Dispatch<PopupAction | Action>) => {
  dispatch({
    type: PopupType.SET_CONFIRM,
    payload: {
      idSelected,
      isOpen
    }
  });
};

export const setIsDeleting = ({idSelected, isOpen}: Popup) => (dispatch: Dispatch<PopupAction | Action>) => {
  dispatch({
    type: PopupType.SET_DELETE,
    payload: {
      idSelected,
      isOpen
    }
  });
};