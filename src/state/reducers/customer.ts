import { CustomerType } from "../action-types/customer";
import { CustomerAction, CustomerState } from "../actions/customer";

const initialState: CustomerState = {
  customers: [],
  customer: null,
  loading: true,
  error: null,
}

const reducer = (state: CustomerState = initialState, action: CustomerAction) => {
  switch(action.type){
    case CustomerType.RETRIEVE_ALL:
      return {
        ...state,
        customers: action.payload,
        loading: false,
        error: null,
      }
    case CustomerType.RETRIEVE_SINGLE_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
        loading:false,
        error:null
      }
    case CustomerType.ADD:
      return {
        ...state,
        customers: [action.payload, ...state.customers],
        loading: false,
        error: null
      }
    case CustomerType.EDIT:
      return {
        ...state,
        loading: false,
        customers: state.customers.map(customer => customer._id === action.payload._id ? customer = action.payload : customer)
      }
    case CustomerType.DELETE:
      return {
        ...state,
        loading: false,
        customers: state.customers.filter(customer => customer._id !== action.payload)
      }
    case CustomerType.ERROR:
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