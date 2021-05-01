import { SET_QUIZES, ADD_QUIZ, SET_ALL_QUIZES } from "../actions/quizes";

const initialState = {
  quizes: [],
  quiz: {},
  all_quizes: [],
};

export default function QuizReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUIZES:
      return {
        ...state,
        quizes: action.payload,
      };
    case SET_ALL_QUIZES:
      return {
        ...state,
        all_quizes: action.payload,
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
