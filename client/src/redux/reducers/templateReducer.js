import * as constants from '../constants';

const initialState = {
    templates: [],
    template: {}
}

function templateReducer (state = initialState, action) {
    switch(action.type) {
        case constants.GET_TEMPLATES:
            return {
                ...state,
                templates: action.payload
            }
        case constants.ADD_TEMPLATE:
            return {
                ...state,
                templates: [...state.templates, action.payload]
            }            
        default:
            return state;
    }
}

export default templateReducer;