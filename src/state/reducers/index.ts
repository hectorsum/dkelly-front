import {combineReducers} from 'redux';
import customerReducer from './customer';
import productReducer from './product';
import authReducer from './auth';
import orderReducer from './order';
import cartReducer from './cart';
import alertReducer from './alert';
import popupReducer from './popup';

const reducers = combineReducers({
  customers: customerReducer,
  products: productReducer,
  auth: authReducer,
  orders: orderReducer,
  cart: cartReducer,
  alerts: alertReducer,
  popup: popupReducer
})

export default reducers;
export type State = ReturnType<typeof reducers>