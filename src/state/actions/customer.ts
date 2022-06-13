import { CustomerType } from "../action-types/customer";
import {Error} from './index'

export interface Customer {
  _id?: string,
  fullname: string,
  cellphone: string,
  company: string,
}

export interface CustomerState {
  customers: Array<Customer>,
  customer: Customer | null,
  loading: Boolean,
  error: Error | null,
}

interface CreateAction {
  type: CustomerType.ADD,
  payload: Customer
}

interface RetrieveAction {
  type: CustomerType.RETRIEVE_ALL,
  payload:Customer
}

interface ClearCustomers {
  type: CustomerType.CLEAR_CUSTOMERS,
}

interface EditCustomer {
  type: CustomerType.EDIT,
  payload: Customer
}
interface DeleteCustomer {
  type: CustomerType.DELETE,
  payload: string
}
interface RetrieveSingleCustomer {
  type: CustomerType.RETRIEVE_SINGLE_CUSTOMER,
  payload: Customer
}

interface ErrorAction {
  type: CustomerType.ERROR,
  payload: Error
}
export type CustomerAction = RetrieveAction | ClearCustomers |
                             CreateAction | 
                             DeleteCustomer |
                             EditCustomer |
                             RetrieveSingleCustomer | ErrorAction;