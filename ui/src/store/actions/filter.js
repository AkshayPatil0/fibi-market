export const SET_PRODUCT_FILTER = "set-product-filter";
export const SET_ORDER_FILTER = "set-order-filter";
export const SET_USER_FILTER = "set-user-filter";
export const RESET_FILTER = "reset-filter";

export const setProductFilter = (name, value) => {
  return {
    type: SET_PRODUCT_FILTER,
    payload: { name, value },
  };
};

export const setOrderFilter = (name, value) => {
  return {
    type: SET_ORDER_FILTER,
    payload: { name, value },
  };
};

export const setUserFilter = (name, value) => {
  return {
    type: SET_USER_FILTER,
    payload: { name, value },
  };
};

export const resetFilter = (name) => {
  return {
    type: RESET_FILTER,
    payload: name,
  };
};
