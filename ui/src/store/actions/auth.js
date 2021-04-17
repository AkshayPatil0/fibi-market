import * as api from "../../api";
import { setSnackbar } from "./app";

export const SET_USER = "signin";
export const SIGNOUT = "signout";
export const SET_WISHLIST = "set-wishlist";

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function signout() {
  return async (dispatch) => {
    await api.signout();
    dispatch({
      type: SIGNOUT,
      payload: {},
    });
    dispatch(setSnackbar("Signed out !", "info"));
  };
}

export function getProfile() {
  return async (dispatch) => {
    const res = await api.fetchProfile();
    dispatch(setUser(res.data));
  };
}

export function updateProfile() {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.currentUser;
      const res = await api.updateProfile(user);

      dispatch(setSnackbar("Updated profile details !", "info"));
      dispatch(setUser(res.data));
    } catch (err) {
      dispatch(setSnackbar("Failed updating profile !", "error"));
    }
  };
}

export function signin(body) {
  return async (dispatch) => {
    const res = await api.signin(body);
    dispatch(setUser(res.data));
    dispatch(setSnackbar("Signed in succesfully !", "success"));
  };
}

export function signup(body) {
  return async (dispatch) => {
    const res = await api.signup(body);
    dispatch(setUser(res.data));
    dispatch(setSnackbar("Signed up succesfully !", "info"));
  };
}

export function googleSignin(body) {
  return async (dispatch) => {
    const res = await api.googleSignin(body);
    dispatch(setUser(res.data));
    dispatch(setSnackbar("Signed in succesfully !", "info"));
  };
}

export function setWishlist(wishlist) {
  return {
    type: SET_WISHLIST,
    payload: wishlist,
  };
}

export function getWishlist() {
  return async (dispatch) => {
    const res = await api.fetchWishlist();
    dispatch(setWishlist(res.data));
  };
}

export const onWishlist = (productId) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.currentUser;
      const wishlist = getState().auth.wishlist;
      let res;
      if (wishlist && wishlist.includes(productId)) {
        res = await api.updateProfile({
          ...user,
          wishlist: wishlist.filter((id) => id !== productId),
        });
        dispatch(setSnackbar("Item removed from wishlist !", "info"));
      } else {
        res = await api.updateProfile({
          ...user,
          wishlist: [...wishlist, productId],
        });
        dispatch(setSnackbar("Item added to wishlist !", "info"));
      }

      dispatch(setWishlist(res.data.wishlist));
    } catch (err) {
      dispatch(setSnackbar("Failed adding product to wishlist !", "error"));
    }
  };
};
