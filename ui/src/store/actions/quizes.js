import * as api from "../../api";
import { setSnackbar } from "./app";
export const SET_QUIZES = "set-quizes";
export const ADD_QUIZ = "add-quiz";

const setQuizes = (quizes) => {
  return {
    type: SET_QUIZES,
    payload: quizes,
  };
};

const setQuiz = (quiz) => {
  return {
    type: ADD_QUIZ,
    payload: quiz,
  };
};

export const getQuizes = (query) => {
  return async (dispatch) => {
    try {
      const res = await api.fetchQuizes(query);
      dispatch(setQuizes(res.data));
    } catch (error) {
      dispatch(
        setSnackbar("Oops! Quiz service is down, Try after sometime", "error")
      );
    }
  };
};

export const updateQuizStatus = (id, body) => {
  return async (dispatch) => {
    try {
      await api.updateQuiz(id, body);
    } catch (error) {
      dispatch(setSnackbar("Failed updating quiz status", "error"));
    }
  };
};

export const addQuiz = (body) => {
  return async (dispatch) => {
    const res = await api.createQuiz(body);
    dispatch(setQuiz(res.data));
  };
};
