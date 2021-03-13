import * as api from "../../api";
import { setIsLoading } from "./app";

export const SET_USER = "signin";
export const SIGNOUT = "signout";
// export const

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
  };
}

export function getProfile() {
  return async (dispatch) => {
    const res = await api.fetchProfile();
    dispatch(setUser(res.data));
  };
}

export function signin(body) {
  return async (dispatch) => {
    const res = await api.signin(body);
    dispatch(setUser(res.data));
  };
}

export function signup(body) {
  return async (dispatch) => {
    const res = await api.signup(body);
    dispatch(setUser(res.data));
  };
}

export function googleSignin(body) {
  return async (dispatch) => {
    const res = await api.googleSignin(body);
    dispatch(setUser(res.data));
  };
}
