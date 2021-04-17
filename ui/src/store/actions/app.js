export const SET_ALERT = "set-alert";
export const RESET_ALERT = "reset-alert";
export const SET_SNACKBAR = "set-snackbar";
export const RESET_SNACKBAR = "reset-snackbar";
export const SET_THEME = "set-theme";

export const setAlert = (title, description, actions) => {
  return {
    type: SET_ALERT,
    payload: { title, description, actions },
  };
};

export const resetAlert = () => {
  return {
    type: RESET_ALERT,
  };
};

export const setSnackbar = (message, type) => {
  return {
    type: SET_SNACKBAR,
    payload: { message, type },
  };
};

export const resetSnackbar = () => {
  return {
    type: RESET_SNACKBAR,
  };
};

export const setTheme = (theme) => {
  return {
    type: SET_THEME,
    payload: theme,
  };
};
