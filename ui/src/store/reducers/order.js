import { SET_ORDERS, SET_CART } from "../actions/order";

const initialState = {
  orders: [],
  cart: {},
};

export default function OrderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
}
