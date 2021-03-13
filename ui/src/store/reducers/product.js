import { SET_CART, SET_CATEGORIES, SET_PRODUCT, SET_PRODUCTS } from "../actions/product";

const initialState = {
  categories: [],
  products: [],
  product: {},
  cart: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case SET_CART:
      return {
        ...state,
        cart: action.payload
      }
    default:
      return state;
  }
}
