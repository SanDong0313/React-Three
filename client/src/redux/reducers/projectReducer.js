import * as constants from '../constants';

const initialState = {
    projects: [],
    project: {},
    success: false,
}

function projectReducer (state = initialState, action) {
    switch(action.type) {
        case constants.GET_PROJECTS: 
            return {
                ...state,
                projects: action.payload,
            }
        case constants.ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                success: true
            }
        case constants.UPDATE_PROJECT:
            return {
                ...state,
                projects: state.projects.map(p => p._id === action.payload._id ? action.payload : p),
                project: action.payload,
                success: true
            }
        case constants.GET_PROJECT:
            return {
                ...state,
                project: action.payload
            }
        default:
            return state;
    }
}

export default projectReducer;