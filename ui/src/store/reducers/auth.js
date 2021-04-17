import { SET_USER, SET_WISHLIST, SIGNOUT } from "../actions/auth";

const initialState = {
  currentUser: null,
  wishlist: [],
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

    case SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };

    default:
      return state;
  }
}
