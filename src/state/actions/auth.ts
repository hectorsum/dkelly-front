import { AuthType } from "../action-types/auth";
import { CustomerType } from "../action-types/customer";
import {Error} from './index'

export interface User {
  _id: string,
  email: string
}

export interface AuthState {
  token: string | null
  isAuthenticated: null
  loading: true
  user: null
}

interface LoginFailAction {
  type: AuthType.LOGIN_FAIL,
}

interface LoginSuccessAction {
  type: AuthType.LOGIN_SUCCESS,
  payload: string //token
}

interface LogOutAction {
  type: AuthType.LOGOUT,
}

interface UserLoadedAction {
  type: AuthType.USER_LOADED,
  payload: User
}

interface ErrorAction {
  type: AuthType.AUTH_ERROR,
}

export type AuthAction = LoginFailAction | 
                         LoginSuccessAction | 
                         LogOutAction | 
                         UserLoadedAction | 
                         ErrorAction;