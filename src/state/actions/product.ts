import { ProductType } from '../action-types/products';
import {Error} from './index'

export interface Product {
  _id?: string,
  name: string,
  qty: number,
  machine: number,
  price: number,
  type: string,
}

export interface ProductState {
  products: Array<Product>,
  product: Product | null,
  loading: Boolean,
  error: Error | null,
}

interface CreateAction {
  type: ProductType.ADD_PRODUCT,
  payload: Product
}

interface RetrieveAction {
  type: ProductType.RETRIEVE_ALL_PRODUCTS,
  payload:Product[]
}

interface ClearProducts {
  type: ProductType.CLEAR_PRODUCTS,
}

interface EditProduct {
  type: ProductType.EDIT_PRODUCT,
  payload: Product
}
interface DeleteProduct {
  type: ProductType.DELETE_PRODUCT,
  payload: string
}
interface RetrieveSingleProduct {
  type: ProductType.RETRIEVE_SINGLE_PRODUCT,
  payload: Product
}

interface ErrorAction {
  type: ProductType.ERROR_PRODUCT,
  payload: Error
}
export type ProductAction = RetrieveAction | ClearProducts |
                             CreateAction | 
                             DeleteProduct |
                             EditProduct |
                             RetrieveSingleProduct | ErrorAction;