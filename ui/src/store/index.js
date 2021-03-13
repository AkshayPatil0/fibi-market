import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import AppReducer from "./reducers/app";
import AuthReducer from "./reducers/auth";
import ProductReducer from "./reducers/product";
import UserReducer from "./reducers/user";
import OrderReducer from "./reducers/order";
import FilterReducer from "./reducers/filter";

const logger = createLogger();

const store = createStore(
  combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    product: ProductReducer,
    user: UserReducer,
    order: OrderReducer,
    filter: FilterReducer,
  }),
  {},
  applyMiddleware(thunk, logger)
);

export default store;
