import * as actionTypes from '../actions/actionTypes';

const initialState = {
  showDeleteModal: false,
  showCreateModal: false,
  showEditModal: false,
  editBoardId: '',
  editBoardName: '',
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_DELETE_BOARD:
      return {
        ...state,
        showDeleteModal: true,
      }
    case actionTypes.MODAL_CREATE_BOARD:
      return {
        ...state,
        showCreateModal: true,
      }
    case actionTypes.MODAL_EDIT_BOARD:
      return {
        ...state,
        showEditModal: true,
        editBoardId: action.boardId,
        editBoardName: action.boardName,
      }
    case actionTypes.CANCEL_DELETE_BOARD:
      return {
        ...state,
        showDeleteModal: false,
      }
    case actionTypes.CANCEL_EDIT_BOARD:
      return {
        ...state,
        showEditModal: false,
        editBoardId: '',
        editBoardName: '',
      }
    case actionTypes.CANCEL_CREATE_BOARD:
      return {
        ...state,
        showCreateModal: false,
      }
    default:
      return state;
  }
}

export default boardReducer;