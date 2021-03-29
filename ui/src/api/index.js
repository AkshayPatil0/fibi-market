import axios from "axios";

import qs from "qs";

const API = axios.create();

export const signin = (body) => API.post("/api/users/signin", body);
export const googleSignin = (body) => API.post("/api/users/googlesignin", body);
export const signup = (body) => API.post("/api/users/signup", body);
export const signout = () => API.get("/api/users/signout");

export const fetchUsers = (query) =>
  API.get(`/api/users?${qs.stringify(query)}`);

export const fetchProfile = () => API.get("/api/users/profile");
export const updateProfile = (body) => API.put("/api/users/profile", body);
export const updateProfileAvatar = (body) =>
  API.put("/api/users/profile/avatar", body);
export const deleteProfileAvatar = () =>
  API.delete("/api/users/profile/avatar");

export const fetchProducts = (query) =>
  API.get(`/api/products?${qs.stringify(query)}`);
export const fetchProduct = (id) => API.get(`/api/products/${id}`);
export const createProduct = (body) => API.post("/api/products", body);
export const updateProduct = (id, body) => API.put(`/api/products/${id}`, body);
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);

export const addProductImage = (id, body) =>
  API.post(`/api/products/${id}/images`, body);
export const removeProductImage = (id, body) =>
  API.post(`/api/products/${id}/images/remove`, body);
export const updateProductImages = (id, body) =>
  API.put(`/api/products/${id}/images`, body);

export const getProductVariant = (productId, variantId) =>
  API.get(`/api/products/${productId}/variants/${variantId}`);
export const addProductVariant = (id, body) =>
  API.post(`/api/products/${id}/variants`, body);
export const removeProductVariant = (id, body) =>
  API.post(`/api/products/${id}/variants/remove`, body);
export const updateProductVariant = (productId, variantId, body) =>
  API.put(`/api/products/${productId}/variants/${variantId}`, body);

export const fetchCategories = () => API.get("/api/products/categories");
export const addCategory = (body) => API.post("/api/products/categories", body);
export const deleteCategory = (id) =>
  API.delete(`/api/products/categories/${id}`);

export const fetchOrders = (query) =>
  API.get(`/api/orders?${qs.stringify(query)}`);
export const fetchMyOrders = () => API.get(`/api/myorders`);
export const placeOrder = () => API.post("/api/orders");
export const cancelOrder = (id) => API.delete(`/api/orders/${id}`);

export const fetchCart = () => API.get("/api/orders/cart");
export const addToCart = (body) => API.post("/api/orders/cart", body);
export const removeFromCart = (body) =>
  API.post("/api/orders/cart/remove", body);
