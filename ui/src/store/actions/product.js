import * as api from "../../api";
import { getImagesFormData } from "../../utils";

export const SET_CATEGORIES = "set-categories";
export const SET_LOCATIONS = "set-locations";
export const SET_PRODUCTS = "set-products";
export const SET_PRODUCT_DETAILS = "set-product-details";
export const SET_PRODUCT_IMAGES = "set-product-images";
export const NEW_PRODUCT = "new-product";
export const UPDATE_PRODUCT = "update-product";

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

export const editCategory = (id, body) => {
  return async (dispatch) => {
    await api.editCategory(id, body);
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

const setLocations = (locations) => {
  return {
    type: SET_LOCATIONS,
    payload: locations,
  };
};

export const getLocations = () => {
  return async (dispatch) => {
    const res = await api.fetchLocations();
    dispatch(setLocations(res.data));
  };
};

export const addLocation = (body) => {
  return async (dispatch) => {
    await api.addLocation(body);
    const res = await api.fetchLocations();
    dispatch(setLocations(res.data));
  };
};

export const deleteLocation = (id) => {
  return async (dispatch) => {
    await api.deleteLocation(id);
    const res = await api.fetchLocations();
    dispatch(setLocations(res.data));
  };
};

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};

export const getProducts = (query) => {
  return async (dispatch) => {
    const res = await api.fetchProducts(query);
    dispatch(setProducts(res.data));
  };
};

export const setProduct = (product) => {
  return {
    type: SET_PRODUCT_DETAILS,
    payload: product,
  };
};

export const setProductImages = (images) => {
  return {
    type: SET_PRODUCT_IMAGES,
    payload: images,
  };
};

export const getProduct = (id = null) => {
  if (!id) return setProduct({});
  return async (dispatch) => {
    const res = await api.fetchProduct(id);
    dispatch(setProduct(res.data));
  };
};

export const newProduct = (onSuccess) => {
  return async (dispatch, getState) => {
    let res;
    const product = getState().product.product;
    const productImages = getState().product.productImages;
    res = await api.createProduct(product);
    const imagesFormData = getImagesFormData(productImages);
    if (imagesFormData) {
      res = await api.updateProductImages(res.data.id, imagesFormData);
    }

    dispatch(
      setProduct({
        ...res.data,
        priceMrp: res.data.price.mrp,
        priceRetail: res.data.price.retail,
      })
    );
    onSuccess(res.data.id);
  };
};

export const updateProduct = () => {
  return async (dispatch, getState) => {
    let res;
    const product = getState().product.product;
    const productImages = getState().product.productImages;
    res = await api.updateProduct(product.id, product);
    const imagesFormData = getImagesFormData(productImages);
    if (imagesFormData) {
      res = await api.updateProductImages(res.data.id, imagesFormData);
    }

    dispatch(
      setProduct({
        ...res.data,
        priceMrp: res.data.price.mrp,
        priceRetail: res.data.price.retail,
      })
    );
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const products = getState().product.products;
    await api.deleteProduct(id);
    dispatch(setProducts(products.filter((val) => val.id !== id)));
  };
};
