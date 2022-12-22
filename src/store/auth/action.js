import { hideLoading, showLoading } from "react-redux-loading-bar";
import { login, putAccessToken, register } from "../../utils/api";

const TYPES = {
  SIGNED_IN: "AUTH_SUCCESS",
  SIGNED_OUT: "AUTH_REMOVED",
};

function authSignIn({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await login({ email, password });
      if (!response.error) {
        putAccessToken(response.data.token);
        dispatch(authSuccess());
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(hideLoading());
  };
}

function authSignUp({ name, email, password }) {
  return async (dispatch) => {
    try {
      const response = await register({ name, email, password });
      if (!response.error) {
        dispatch(authSignIn({ email, password }));
      }
    } catch (error) {
      console.error(error);
    }
  };
}

function authSuccess() {
  return {
    type: TYPES.SIGNED_IN,
    payload: {
      authorized: true,
    },
  };
}

function authRemoved() {
  return {
    type: TYPES.SIGNED_OUT,
    payload: {
      authorized: false,
    },
  };
}

export { authSignIn, authSignUp, authSuccess, authRemoved, TYPES };
