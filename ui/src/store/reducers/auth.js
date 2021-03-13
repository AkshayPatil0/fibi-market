import { SET_USER, SIGNOUT } from "../actions/auth";

const initialState = {
  currentUser: null,
};
export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case SIGNOUT:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
}
