import axios from 'axios';
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, ADD_PROJECT, UPDATE_PROJECT, SET_PENDING } from '../constants';

export const addProject = (data) => dispatch => {
    dispatch({
        type: SET_PENDING,
        payload: true
    });
    axios.post(process.env.REACT_APP_API_URL + "/projects", data)
        .then(res => {
            dispatch({
                type: ADD_PROJECT,
                payload: res.data
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

export const getProjects = () => dispatch => {
    axios.get(process.env.REACT_APP_API_URL + "/projects")
        .then(res => {
            dispatch({
                type: GET_PROJECTS,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data));
}

export const getProject = (project_name) => dispatch => {
    axios.get(process.env.REACT_APP_API_URL + "/projects/" + project_name)
        .then(res => {
            dispatch({
                type: GET_PROJECT,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data));
}

export const uploadImages = (formData) => dispatch => {
    dispatch({
        type: SET_PENDING,
        payload: true
    });
    axios.post(process.env.REACT_APP_API_URL + "/projects/upload", formData)
        .then(res => {
            dispatch({
                type: SET_PENDING,
                payload: false
            });
            alert("Upload success")
            dispatch({
                type: UPDATE_PROJECT,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch({
                type: SET_PENDING,
                payload: false
            });
        })
}

export const buildImage = (formData) => dispatch => {
    axios.post(process.env.REACT_APP_API_URL + "/projects/build", formData)
        .then(res => {
            dispatch({
                type: SET_PENDING,
                payload: false
            });
            if(res.data.success) {
                dispatch({
                    type: UPDATE_PROJECT,
                    payload: res.data.project
                });
            } else {
                alert("Failed to build")
            }
        })
        .catch(err => {
            dispatch({
                type: SET_PENDING,
                payload: false
            });
            console.log(err.response.data)
        });
}