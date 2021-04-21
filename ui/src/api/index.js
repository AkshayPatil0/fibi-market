import axios from "axios";

import qs from "qs";

const API = axios.create();

// ------------------
//  Auth
// ------------------
export const signin = (body) => API.post("/api/users/signin", body);
export const googleSignin = (body) => API.post("/api/users/googlesignin", body);
export const signup = (body) => API.post("/api/users/signup", body);
export const signout = () => API.get("/api/users/signout");

// ------------------
//  Users
// ------------------
export const fetchUsers = (query) =>
  API.get(`/api/users?${qs.stringify(query)}`);

export const fetchProfile = () => API.get("/api/users/profile");
export const fetchWishlist = () => API.get("/api/users/profile/wishlist");
export const updateProfile = (body) => API.put("/api/users/profile", body);
export const updateProfileAvatar = (body) =>
  API.put("/api/users/profile/avatar", body);
export const deleteProfileAvatar = () =>
  API.delete("/api/users/profile/avatar");

// ------------------
//  Products
// ------------------
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

// ------------------
//  Categories
// ------------------
export const fetchCategories = () => API.get("/api/products/categories");
export const fetchCategory = (id) => API.get(`/api/products/categories/${id}`);
export const addCategory = (body) => API.post("/api/products/categories", body);
export const editCategory = (id, body) =>
  API.put(`/api/products/categories/${id}`, body);
export const deleteCategory = (id) =>
  API.delete(`/api/products/categories/${id}`);

// ------------------
//  Locations
// ------------------
export const fetchLocations = () =>
  API.get("/api/products/categories?location=true");
export const fetchLocation = (id) =>
  API.get(`/api/products/categories/${id}?location=true`);
export const addLocation = (body) =>
  API.post("/api/products/categories", { ...body, location: true });
export const deleteLocation = (id) =>
  API.delete(`/api/products/categories/${id}`);

// ------------------
//  Orders
// ------------------
export const fetchOrders = (query) =>
  API.get(`/api/orders?${qs.stringify(query)}`);
export const fetchMyOrders = () => API.get(`/api/orders/myorders`);
export const placeOrder = (body) => API.post("/api/orders", body);
export const fetchOrder = (id) => API.get(`/api/orders/${id}`);
export const updateOrder = (id, body) => API.put(`/api/orders/${id}`, body);
export const cancelOrder = (id) => API.delete(`/api/orders/${id}`);

// ------------------
//  Cart
// ------------------
export const fetchCart = () => API.get("/api/orders/cart");
export const addToCart = (body) => API.post("/api/orders/cart", body);
export const removeFromCart = (body) =>
  API.post("/api/orders/cart/remove", body);

// ------------------
//  Blog
// ------------------
export const fetchBlogs = (query) =>
  API.get(`/api/blogs?${qs.stringify(query)}`);
export const fetchBlog = (slug) => API.get(`/api/blogs/${slug}`);
export const createBlog = (body) => API.post(`/api/blogs/`, body);
export const updateBlog = (id, body) => API.put(`/api/blogs/${id}`, body);
export const deleteBlog = (id) => API.delete(`/api/blogs/${id}`);

export const addBlogCover = (id, body) =>
  API.post(`/api/blogs/${id}/cover`, body);
export const removeBlogCover = (id) =>
  API.post(`/api/blogs/${id}/cover/remove`);

export const addBlogImage = (id, body) =>
  API.post(`/api/blogs/${id}/images`, body);
export const removeBlogImage = (id, body) =>
  API.post(`/api/blogs/${id}/images/remove`, body);
export const updateBlogImages = (id, body) =>
  API.put(`/api/blogs/${id}/images`, body);
