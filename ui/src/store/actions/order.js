import * as api from "../../api";

export const SET_ORDERS = "set-orders";
export const SET_CART = "set-cart";
export const SET_ORDER = "set-order";

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

export const setOrder = (order) => {
  return {
    type: SET_ORDER,
    payload: order,
  };
};

export const createOrder = () => {
  return async (dispatch, getState) => {
    const cart = getState().order.cart;
    if (!cart) return;

    let totalPrice = { mrp: 0, retail: 0 };
    const orders = await Promise.all(
      cart.products.map(({ product, quantity }) => {
        return new Promise(async (resolve, reject) => {
          try {
            const price = {
              mrp: product.price.mrp * quantity,
              retail: product.price.retail * quantity,
            };
            const res = await api.placeOrder({
              productId: product.id,
              quantity,
              price,
            });
            totalPrice = {
              mrp: totalPrice.mrp + price.mrp,
              retail: totalPrice.retail + price.retail,
            };
            resolve(res.data.id);
          } catch (err) {
            reject(err);
          }
        });
      })
    );
    const res = await api.placeOrder({ orders, price: totalPrice });
    dispatch(setOrder(res.data));
  };
};

export const setOrderField = (field) => {
  return async (dispatch, getState) => {
    const order = getState().order.order;

    if (!order) throw new Error("Order state is not defined");

    const res = await api.updateOrder(order.id, { ...order, ...field });
    dispatch(setOrder(res.data));
  };
};

export const placeOrder = () => {
  return async (dispatch, getState) => {
    const order = getState().order.order;

    if (!order) throw new Error("Order state is not defined");

    const res = await api.updateOrder(order.id, { ...order, status: "placed" });
    dispatch(setOrder(res.data));
  };
};
