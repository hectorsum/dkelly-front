import { PopupType } from "../action-types/popup";
import { PopupAction, PopupState } from "../actions/popup";

const initialState: PopupState = {
  isConfirming: {
    isOpen: false,
    idSelected: null
  },
  isEditing: {
    isOpen: false,
    idSelected: null
  },
  isDeleting: {
    isOpen: false,
    idSelected: null
  },
};

const reducer = (state: PopupState = initialState, action: PopupAction) => {
  switch (action.type) {
    case PopupType.SET_CONFIRM:
      return { ...state,  isConfirming: action.payload };
    case PopupType.SET_EDIT:
        return { ...state,  isEditing: action.payload };
    case PopupType.SET_DELETE:
        return { ...state,  isDeleting: action.payload };
    default:
      return state;
  }
}

export default reducer;