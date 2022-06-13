import { CartType } from "../action-types/cart";
import { CartAction, CartState } from "../actions/cart";
import { Product } from "../actions/product";

const initialState: CartState = {
  cart: [],
  product: null,
  loading: true,
  error: null,
}

const reducer = (state: CartState = initialState, action: CartAction) => {
  switch (action.type) {
    case CartType.ADD_PRODUCT_CART:
      const inCart =
        state.cart &&
        state.cart.find((product: Product) => {
          if (product._id === action.payload._id) {
            product.qty += action.payload.qty;
            return product;
          }
        });
      return {
        ...state,
        cart: inCart ? [...state.cart] : [...state.cart, action.payload],
        loading: false,
      };
    case CartType.LOAD_ALL_PRODUCTS:
      return {
        ...state,
        cart: action.payload,
        loading: false
      }
    case CartType.REMOVE_ALL_PRODUCTS:
      return {
        ...state,
        cart: [],
        loading:false
      }
    case CartType.REMOVE_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => product._id !== action.payload),
        loading: false,
      };
    case CartType.UPDATE_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id === action.payload.id) {
            product.qty += action.payload.qty;
          }
          return product;
        }),
        loading: false,
      };
    case CartType.ADD_QTY_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((product: Product) => {
          if (product._id === action.payload) {
            product.qty += 1;
          }
          return product;
        }),
        loading: false,
      };
    case CartType.REMOVE_QTY_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id === action.payload) {
            product.qty = product.qty > 1 ? product.qty - 1 : 1;
          }
          return product;
        }),
        loading: false,
      };
    case CartType.CLEAR_CART:
      return {
        ...state,
        cart: [],
        loading: false,
      };
    case CartType.CART_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: true,
      };
    default:
      return state;
  }
}

export default reducer;