import { SET_QUIZES } from "../actions/quizes";

const initialState = {
  quizes: [],
};

export default function QuizReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUIZES:
      return {
        ...state,
        quizes: action.payload,
      };
    default:
      return state;
  }
}
