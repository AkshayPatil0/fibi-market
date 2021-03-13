export const IS_LOADING = "is-loading";
export const SET_ERROR = "set-error";
export const RESET_ERROR = "reset-error";

export const setIsLoading = (key) => {
  return {
    type: IS_LOADING,
    payload: key,
  };
};

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};
