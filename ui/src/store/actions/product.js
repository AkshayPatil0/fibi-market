import * as api from "../../api";

export const SET_CATEGORIES = "set-categories";
export const SET_PRODUCTS = "set-products";
export const SET_PRODUCT = "set-product";
export const SET_CART = "set-cart";

const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    const res = await api.fetchCategories();
    dispatch(setCategories(res.data));
  };
};

export const addCategory = (body) => {
  return async (dispatch) => {
    await api.addCategory(body);
    const res = await api.fetchCategories();
    dispatch(setCategories(res.data));
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    await api.deleteCategory(id);
    const res = await api.fetchCategories();
    dispatch(setCategories(res.data));
  };
};

const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};

export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    payload: product,
  };
};

export const getProducts = (query) => {
  return async (dispatch) => {
    const res = await api.fetchProducts(query);
    dispatch(setProducts(res.data));
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {
    const res = await api.fetchProduct(id);
    dispatch(setProduct(res.data));
  };
};

const setCart = (cart) => {
  return {
    type: SET_CART,
    payload: cart
  }
}

export const getCart = () => {
  return async dispatch => {

    const res = await api.fetchCart();
    dispatch(setCart(res.data));
  }
}

export const addToCart = (productId, quantity) => {
  return async dispatch => {
    const res = await api.addToCart({ productId, quantity });
    dispatch(setCart(res.data));

  }
}

export const removeFromCart = (productId, quantity) => {
  return async dispatch => {
    const res = await api.removeFromCart({ productId, quantity });
    dispatch(setCart(res.data));

  }
}