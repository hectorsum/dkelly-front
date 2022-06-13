import { OrderType } from "../action-types/order";
import {Error} from './index'
import {Product} from './product';
export interface Order {
  _id?: string,
  customer: string,
  products: Product[],
  notes: string,
  total?: number,
  date?: Date,
  hasPaid: boolean
}

export interface OrderState {
  orders: Array<Order>,
  order: Order | null,
  loading: Boolean,
  error: Error | null,
}

interface CreateAction {
  type: OrderType.ADD_ORDER,
  payload: Order
}

interface RetrieveAction {
  type: OrderType.RETRIEVE_ALL_ORDERS,
  payload: Order[]
}

interface ClearOrders {
  type: OrderType.CLEAR_ORDERS,
}

interface EditOrder {
  type: OrderType.EDIT_ORDER,
  payload: Order
}
interface DeleteOrder {
  type: OrderType.DELETE_ORDER,
  payload: string
}
interface RetrieveSingleOrder {
  type: OrderType.RETRIEVE_SINGLE_ORDER,
  payload: Order
}
interface ConfirmPaymentAction {
  type: OrderType.CONFIRM_PAYMENT,
  payload: Order
}
interface ErrorAction {
  type: OrderType.ERROR_ORDER,
  payload: Error
}
export type OrderAction = RetrieveAction | ClearOrders |
                             CreateAction | 
                             DeleteOrder |
                             EditOrder | ConfirmPaymentAction |
                             RetrieveSingleOrder | ErrorAction;