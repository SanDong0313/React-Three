import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import templateReducer from './templateReducer';

export default combineReducers({
    error: errorReducer,
    auth: userReducer,
    project: projectReducer,
    template: templateReducer
});
