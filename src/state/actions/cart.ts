import { AuthType } from "../action-types/auth";
import { CartType } from "../action-types/cart";
import { CustomerType } from "../action-types/customer";
import {Error} from './index'
import { Product } from "./product";

export interface CartState {
  cart: Array<Product>
  product: Product | null
  loading: Boolean
  error: Error | null,
}

interface AddProductAction {
  type: CartType.ADD_PRODUCT_CART,
  payload: Product
}

interface RemoveAllAction {
  type: CartType.REMOVE_ALL_PRODUCTS,
  payload: string
}

interface LoadAllProductsAction {
  type: CartType.LOAD_ALL_PRODUCTS,
  payload: Product[]
}

interface RemoveProductAction {
  type: CartType.REMOVE_PRODUCT_CART,
  payload: string
}

interface UpdateProductAction {
  type: CartType.UPDATE_PRODUCT_CART,
  payload: {
    id: string,
    qty: number
  }
}

interface AddQtyProductAction {
  type: CartType.ADD_QTY_PRODUCT_CART,
  payload: string
}

interface RemoveQtyProductAction {
  type: CartType.REMOVE_QTY_PRODUCT_CART,
  payload: string
}

interface ClearCartAction {
  type: CartType.CLEAR_CART,
}

interface CarErrorAction {
  type: CartType.CART_ERROR,
  payload: Error
}

export type CartAction = AddProductAction | LoadAllProductsAction |
                         AddQtyProductAction | 
                         RemoveProductAction | 
                         RemoveAllAction |
                         UpdateProductAction | 
                         RemoveQtyProductAction | ClearCartAction | CarErrorAction;