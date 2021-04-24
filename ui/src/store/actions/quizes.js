import * as api from "../../api";
export const SET_QUIZES = "set-quizes";

const setQuizes = (quizes) => {
  return {
    type: SET_QUIZES,
    payload: quizes,
  };
};

export const getQuizes = (query) => {
  return async (dispatch) => {
    const res = await api.fetchQuizes(query);
    dispatch(setQuizes(res.data));
  };
};

export const updateQuizStatus = (id, body) => {
  return async () => {
    await api.updateQuiz(id, body);
  };
};
