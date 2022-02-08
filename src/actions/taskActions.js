import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_RESET,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_RESET,
  TASK_DETAILS_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_RESET,
  TASK_UPDATE_SUCCESS,
} from '../constants/taskConstants';
import realm from '../services/TaskSchema';
import uuid from 'react-native-uuid';

export const listTasks = (state = {tasks: []}) => async dispatch => {
  try {
    dispatch ({type: TASK_LIST_REQUEST});
    const data = await realm.objects ('Task');
    dispatch ({
      type: TASK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch ({
      type: TASK_LIST_FAIL,
      payload: error,
    });
  }
};

export const listTaskDetails = id => async dispatch => {
  try {
    dispatch ({type: TASK_DETAILS_REQUEST});
    const data = realm.objects('Task').filtered ('id == $0', id);
    dispatch ({
      type: TASK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch ({
      type: TASK_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const deleteTask = id => async (dispatch, getState) => {
  try {
    dispatch ({
      type: TASK_DELETE_REQUEST,
    });
    const task = realm.objects ('Task').filtered ('id == $0', id);
    realm.write (() => {
      realm.delete (task);
    });

    dispatch ({type: TASK_DELETE_SUCCESS});
  } catch (error) {
    dispatch ({
      type: TASK_DELETE_FAIL,
      payload: error,
    });
  }
};

export const registerTask = (title, description, image) => async dispatch => {
  try {
    dispatch ({
      type: TASK_CREATE_REQUEST,
    });

    const data = await realm.write (() => {
      realm.create ('Task', {
        id: uuid.v4 (),
        title: title,
        description: description,
        image: image,
        datetime: Date (),
      });
    });
    dispatch ({type: TASK_CREATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: TASK_CREATE_FAIL,
      payload: error,
    });
  }
};

export const updateTask = (id, title, description, image) => async (
  dispatch
) => {
  try {
    dispatch ({
      type: TASK_UPDATE_REQUEST,
    });
    const taskUpdate = realm.objects ('Task').filtered ('id == $0', id);
    const data = realm.write (() => {
      taskUpdate[0].title = title;
      taskUpdate[0].description = description;
      taskUpdate[0].image = image;
    });
    dispatch ({type: TASK_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: TASK_UPDATE_FAIL,
      payload: error,
    });
  }
};
