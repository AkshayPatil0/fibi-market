import * as api from "../../api";
import { setSnackbar } from "./app";
export const SET_USERS = "set-users";

const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

export const getUsers = (query) => {
  return async (dispatch) => {
    const res = await api.fetchUsers(query);
    dispatch(setUsers(res.data));
  };
};

export const setRole = (id, role, email) => {
  console.log({ id, role, email });
  return async (dispatch) => {
    try {
      await api.setRole(id, role);
      dispatch(setSnackbar(`${email} is now ${role} !`, "success"));
    } catch (err) {
      dispatch(setSnackbar(`Failed assigning role !`, "error"));
      throw err;
    }
  };
};

export const submitQuiz = (body) => {
  return async () => {
    await api.submitQuiz(body);
  };
};
