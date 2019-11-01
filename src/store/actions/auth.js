import * as actionTypes from './actionTypes'

export const responseHandler = (token, userId) => {
  return {
    type: actionTypes.RESPONSE_HANDLER,
    token: token,
    userId: userId,
  }
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const authTimeout = (expiresIn) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiresIn * 1000);
  }
}