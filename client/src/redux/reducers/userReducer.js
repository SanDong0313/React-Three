import * as constants from '../constants';
import isEmpty from '../../utils/is-empty';

const initialState = {
    isAuthenticated: false,
    users: [],
    user: {},
    pending: false
}

function userReducer (state = initialState, action) {
    switch(action.type) {
        case constants.SET_CURRENT_USER: 
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !isEmpty(action.payload),              
            }
        case constants.GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case constants.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            }
        case constants.SET_PENDING:
            return {
                ...state,
                pending: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;