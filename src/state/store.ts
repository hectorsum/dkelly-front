import { applyMiddleware, compose, createStore } from "redux";
import reducers from './reducers';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;