import * as actionTypes from '../actions/actionTypes';

const initialState = {
  showDeleteListModal: false,
  deleteListId: '',
  showCreateListModal: false,
  showEditListModal: false,
  editListId: '',
  editListName: '',
}

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_DELETE_LIST:
      return {
        ...state,
        showDeleteListModal: true,
        deleteListId: action.listId,
      }
    case actionTypes.MODAL_EDIT_LIST:
      return {
        ...state,
        showEditListModal: true,
        editListId: action.listId,
        editListName: action.listName,
      }
    case actionTypes.MODAL_CREATE_LIST:
      return {
        ...state,
        showCreateListModal: true,
      }
    case actionTypes.CANCEL_DELETE_LIST:
      return {
        ...state,
        showDeleteListModal: false,
        deleteListId: '',
      }
    case actionTypes.CANCEL_EDIT_LIST:
      return {
        ...state,
        showEditListModal: false,
        editListId: '',
        editListName: '',
      }
    case actionTypes.CANCEL_CREATE_LIST:
      return {
        ...state,
        showCreateListModal: false,
      }
    default:
      return state;
  }
}

export default listReducer;