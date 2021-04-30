import { SET_QUIZES } from "../actions/quizes";
import { ADD_QUIZ } from "../actions/quizes";

const initialState = {
  quizes: [],
  quiz: {},
};

export default function QuizReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUIZES:
      return {
        ...state,
        quizes: action.payload,
      };
    case ADD_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };
    default:
      return state;
  }
}
