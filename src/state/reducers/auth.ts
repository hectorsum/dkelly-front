import { AuthType } from "../action-types/auth";
import { AuthAction, AuthState } from "../actions/auth";

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading:true,
  user:null
}

const reducer = (state: AuthState = initialState, action: AuthAction) => {
  switch(action.type){
    case AuthType.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading:false,
        user: action.payload //* User data (email)
      }
    case AuthType.LOGIN_SUCCESS:
      // localStorage.setItem('token',action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading:false
      }
    case AuthType.AUTH_ERROR:
    case AuthType.LOGIN_FAIL:
    case AuthType.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token:null,
        isAuthenticated: false,
        loading:false
      }
    default: 
      return state;
  }
}

export default reducer;