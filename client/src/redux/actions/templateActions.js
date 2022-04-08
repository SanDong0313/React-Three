import axios from "axios";
import { GET_ERRORS, SET_PENDING, GET_TEMPLATES, ADD_TEMPLATE, CLEAR_ERRORS } from "../constants";

export const getTemplates = () => dispatch => {
    axios.get(process.env.REACT_APP_API_URL + "/template")
        .then(res => {
            dispatch({
                type: GET_TEMPLATES,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data));
}

export const saveTemplate = (formData) => dispatch => {
    dispatch({
        type: SET_PENDING,
        payload: true
    });
    axios.post(process.env.REACT_APP_API_URL + "/template", formData)
        .then(res => {
            dispatch({
                type: ADD_TEMPLATE,
                payload: res.data
            });
            dispatch({
                type: CLEAR_ERRORS
            })
            dispatch({
                type: SET_PENDING,
                payload: false
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            dispatch({
                type: SET_PENDING,
                payload: false
            });
        })
}