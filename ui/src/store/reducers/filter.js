import {
  SET_PRODUCT_FILTER,
  SET_ORDER_FILTER,
  SET_USER_FILTER,
  RESET_FILTER,
} from "../actions/filter";

const initialState = {
  product: {},
  order: {},
  user: {},
};

export default function FilterReducer(state = initialState, action) {
  const { name, value } = action.payload || { name: "", value: "" };
  switch (action.type) {
    case SET_PRODUCT_FILTER:
      return {
        ...state,
        product: { ...state.product, [name]: value },
      };
    case SET_ORDER_FILTER:
      return {
        ...state,
        order: { ...state.order, [name]: value },
      };
    case SET_USER_FILTER:
      return {
        ...state,
        user: { ...state.user, [name]: value },
      };

    case RESET_FILTER:
      return {
        ...state,
        [action.payload]: {},
      };

    default:
      return state;
  }
}
