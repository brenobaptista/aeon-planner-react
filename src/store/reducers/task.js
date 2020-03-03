import * as actionTypes from '../actions/actionTypes';

const initialState = {
  showDeleteTaskModal: false,
  deleteTaskId: '',
  showEditTaskModal: false,
  editTaskId: '',
  editTaskName: '',
  editTaskDescription: '',
  editTaskListId: '',
  showCreateTaskModal: false,
  createTaskListId: '',
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_DELETE_TASK:
      return {
        ...state,
        showDeleteTaskModal: true,
        deleteTaskId: action.taskId,
      };
    case actionTypes.MODAL_EDIT_TASK:
      return {
        ...state,
        showEditTaskModal: true,
        editTaskId: action.taskId,
        editTaskName: action.taskName,
        editTaskDescription: action.taskDescription,
        editTaskListId: action.listId,
      };
    case actionTypes.MODAL_CREATE_TASK:
      return {
        ...state,
        showCreateTaskModal: true,
        createTaskListId: action.listId,
      };
    case actionTypes.CANCEL_DELETE_TASK:
      return {
        ...state,
        showDeleteTaskModal: false,
        deleteTaskId: '',
      };
    case actionTypes.CANCEL_EDIT_TASK:
      return {
        ...state,
        showEditTaskModal: false,
        editTaskId: '',
        editTaskName: '',
        editTaskDescription: '',
        editTaskListId: '',
      };
    case actionTypes.CANCEL_CREATE_TASK:
      return {
        ...state,
        showCreateTaskModal: false,
        createTaskListId: '',
      };
    default:
      return state;
  }
};

export default taskReducer;
