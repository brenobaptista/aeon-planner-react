import * as actionTypes from './actionTypes'

export const responseHandler = (token, userId, expiresIn) => {
  return dispatch => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', userId);
    dispatch(authLogin(token, userId));
    dispatch(authTimeout(expiresIn));
  }
};

export const authLogin = (token, userId) => {
  return {
    type: actionTypes.RESPONSE_HANDLER,
    token: token,
    userId: userId,
  }
}

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
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

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(responseHandler(token, userId, (expirationDate.getTime() - new Date().getTime())/1000 ));
      }
    }
  };
};