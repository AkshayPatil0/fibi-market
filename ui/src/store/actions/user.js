import * as api from "../../api";
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
