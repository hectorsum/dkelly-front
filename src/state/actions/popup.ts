import { PopupType } from "../action-types/popup";

export interface Popup {
  isOpen: boolean,
  idSelected: string | null,
}

export interface PopupState {
  isEditing: Popup,
  isDeleting: Popup,
  isConfirming: Popup
}

interface SetConfirmAction {
  type: PopupType.SET_CONFIRM,
  payload: Popup
}
interface SetEditingAction {
  type: PopupType.SET_EDIT,
  payload: Popup
}
interface SetDeletingAction {
  type: PopupType.SET_DELETE,
  payload: Popup
}

export type PopupAction = SetConfirmAction | SetEditingAction | SetDeletingAction;