import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESPONSE_HANDLER:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      }
    default:
      return state;
  }
}

export default authReducer;