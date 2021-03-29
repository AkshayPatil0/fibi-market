import * as api from "../../api";

export const SET_ORDERS = "set-orders";
export const SET_CART = "set-cart";

const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    payload: orders,
  };
};

export const getOrders = (query) => {
  return async (dispatch) => {
    const res = await api.fetchOrders(query);
    dispatch(setOrders(res.data));
  };
};

export const getMyOrders = () => {
  return async (dispatch) => {
    const res = await api.fetchMyOrders();
    dispatch(setOrders(res.data));
  };
};

const setCart = (cart) => {
  return {
    type: SET_CART,
    payload: cart,
  };
};

export const getCart = () => {
  return async (dispatch) => {
    const res = await api.fetchCart();
    dispatch(setCart(res.data));
  };
};

export const addToCart = (productId, quantity, variantId) => {
  return async (dispatch) => {
    const res = await api.addToCart({ productId, quantity, variantId });
    dispatch(setCart(res.data));
  };
};

export const removeFromCart = (productId, quantity, variantId) => {
  return async (dispatch) => {
    const res = await api.removeFromCart({ productId, quantity, variantId });
    dispatch(setCart(res.data));
  };
};
