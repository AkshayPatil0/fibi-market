import { IS_LOADING, SET_ERROR, RESET_ERROR } from "../actions/app";

const initialState = {
  isLoading: false,
  error: "",
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case RESET_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
}
