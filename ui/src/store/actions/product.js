import * as api from "../../api";
import { setSnackbar } from "./app";

export const SET_CATEGORIES = "set-categories";
export const SET_LOCATIONS = "set-locations";
export const SET_BANNERS = "set-banners";
export const SET_PRODUCTS = "set-products";
export const SET_PRODUCT_DETAILS = "set-product-details";
export const SET_PRODUCT_IMAGES = "set-product-images";

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
    try {
      await api.addCategory(body);
      const res = await api.fetchCategories();
      dispatch(setCategories(res.data));
      dispatch(setSnackbar("Category created successfully !", "info"));
    } catch (err) {
      dispatch(setSnackbar("Failed creating category !", "error"));
    }
  };
};

export const editCategory = (id, body) => {
  return async (dispatch) => {
    try {
      await api.editCategory(id, body);
      const res = await api.fetchCategories();
      dispatch(setCategories(res.data));
      dispatch(setSnackbar("Category updated successfully !", "info"));
    } catch (err) {
      dispatch(setSnackbar("Failed updating category !", "error"));
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      await api.deleteCategory(id);
      const res = await api.fetchCategories();
      dispatch(setCategories(res.data));
      dispatch(setSnackbar("Category deleted successfully !", "info"));
    } catch (err) {
      dispatch(setSnackbar("Failed deleting category !", "error"));
    }
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
    try {
      await api.addLocation(body);
      const res = await api.fetchLocations();
      dispatch(setLocations(res.data));
      dispatch(setSnackbar("Location created successfully !", "info"));
    } catch (err) {
      dispatch(setSnackbar("Failed creating location !", "error"));
    }
  };
};

export const deleteLocation = (id) => {
  return async (dispatch) => {
    try {
      await api.deleteLocation(id);
      const res = await api.fetchLocations();
      dispatch(setLocations(res.data));
      dispatch(setSnackbar("Location deleted successfully !", "info"));
    } catch (err) {
      dispatch(setSnackbar("Failed deleting location !", "error"));
    }
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
    try {
      const res = await api.fetchProducts(query);
      dispatch(setProducts(res.data));
    } catch (err) {
      dispatch(setSnackbar("Failed fetching products, try again !", "error"));
    }
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
    try {
      const res = await api.fetchProduct(id);
      dispatch(setProduct(res.data));
    } catch (err) {
      dispatch(
        setSnackbar("Failed fetching product details, try again !", "error")
      );
    }
  };
};

export const newProduct = (onSuccess) => {
  return async (dispatch, getState) => {
    try {
      const product = getState().product.product;
      const res = await api.createProduct(product);
      dispatch(setSnackbar("Product created successfully !", "info"));
      dispatch(
        setProduct({
          ...res.data,
          priceMrp: res.data.price.mrp,
          priceRetail: res.data.price.retail,
        })
      );
      onSuccess(res.data.id);
    } catch (err) {
      dispatch(setSnackbar("Failed creating product, try again !", "error"));
    }
  };
};

export const updateProduct = () => {
  return async (dispatch, getState) => {
    try {
      const product = getState().product.product;
      const res = await api.updateProduct(product.id, product);

      dispatch(setSnackbar("Updated product successfully !", "success"));
      dispatch(
        setProduct({
          ...res.data,
          priceMrp: res.data.price.mrp,
          priceRetail: res.data.price.retail,
        })
      );
    } catch (err) {
      dispatch(setSnackbar("Failed updating product, try again !", "error"));
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      const products = getState().product.products;
      await api.deleteProduct(id);

      dispatch(setSnackbar("Deleted product successfully !", "success"));
      dispatch(setProducts(products.filter((val) => val.id !== id)));
    } catch (err) {
      dispatch(setSnackbar("Failed deleting product, try again !", "error"));
    }
  };
};

export const setBanners = (banners) => {
  return {
    type: SET_BANNERS,
    payload: banners,
  };
};

export const getBanners = () => {
  return async (dispatch) => {
    const res = await api.fetchBanners();
    dispatch(setBanners(res.data));
  };
};

export const addBanner = (body) => {
  return async (dispatch) => {
    await api.addBanner(body);
    const res = await api.fetchBanners();
    dispatch(setBanners(res.data));
  };
};

export const updateBanner = (id, body) => {
  return async (dispatch) => {
    await api.updateBanner(id, body);
    const res = await api.fetchBanners();
    dispatch(setBanners(res.data));
  };
};

export const deleteBanner = (id) => {
  return async (dispatch) => {
    await api.deleteBanner(id);
    const res = await api.fetchBanners();
    dispatch(setBanners(res.data));
  };
};
