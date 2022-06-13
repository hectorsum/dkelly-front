import { ProductType } from "../action-types/products";
import { ProductAction, ProductState } from "../actions/product";

const initialState: ProductState = {
  products: [],
  product: null,
  loading: true,
  error: null,
}

const reducer = (state: ProductState = initialState, action: ProductAction) => {
  switch(action.type){
    case ProductType.RETRIEVE_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      }
    case ProductType.RETRIEVE_SINGLE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading:false,
        error:null
      }
    case ProductType.ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false,
        error: null
      }
    case ProductType.EDIT_PRODUCT:
      return {
        ...state,
        loading: false,
        products: state.products.map(product => product._id === action.payload._id ? product = action.payload : product)
      }
    case ProductType.DELETE_PRODUCT:
      return {
        ...state,
        loading: false,
        products: state.products.filter(product => product._id !== action.payload)
      }
    case ProductType.ERROR_PRODUCT:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}

export default reducer;