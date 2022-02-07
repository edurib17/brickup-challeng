import {createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
  tasksReducer,
  taskDetailsReducer,
  taskDeleteReducer,
  taskCreateReducer,
  taskUpdateReducer,
} from './reducers/taskReducers';

//Consts
const reducer = combineReducers ({
  tasksList: tasksReducer,
  taskDetails: taskDetailsReducer,
  taskDelete: taskDeleteReducer,
  taskCreate: taskCreateReducer,
  taskUpdate: taskUpdateReducer,
});

const middleware = [thunk]

const store = createStore (reducer,applyMiddleware(...middleware))

export default store;
