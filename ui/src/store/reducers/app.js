import {
  RESET_ALERT,
  RESET_SNACKBAR,
  SET_ALERT,
  SET_SNACKBAR,
  SET_THEME,
} from "../actions/app";

const initialAlert = {
  title: "",
  description: "",
  actions: [],
};
const initialSnackbar = {
  message: "",
  type: "",
  actions: [],
};
const initialState = {
  openAlert: false,
  alert: initialAlert,
  openSnackbar: false,
  snackbar: initialSnackbar,
  theme: "",
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        openAlert: true,
        alert: {
          title: action.payload.title,
          description: action.payload.description,
          actions: action.payload.actions || [],
        },
      };
    case RESET_ALERT:
      return {
        ...state,
        openAlert: false,
        alert: initialAlert,
      };

    case SET_SNACKBAR:
      return {
        ...state,
        openSnackbar: true,
        snackbar: {
          message: action.payload.message,
          type: action.payload.type,
          actions: action.payload.actions || [],
        },
      };
    case RESET_SNACKBAR:
      return {
        ...state,
        openSnackbar: false,
        snackbar: initialSnackbar,
      };

    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}
