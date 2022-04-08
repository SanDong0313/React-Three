import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, GET_USERS, DELETE_USER, SET_PENDING } from '../constants';
import setAuthToken from '../../utils/setAuthToken'

export const registerUser = (data, history) => dispatch => {
    dispatch({
        type: SET_PENDING,
        payload: true
    });
    axios.post(process.env.REACT_APP_API_URL + "/users", data)
        .then(res => {
            dispatch({
                type: SET_PENDING,
                payload: false
            });
            history.push("/login");
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

export const loginUser = (data) => dispatch => {
    dispatch({
        type: SET_PENDING,
        payload: true
    });
    axios.post(process.env.REACT_APP_API_URL + "/users/login", data)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
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

export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const checkAuthenticate = (history) => dispatch => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        setAuthToken(token);
        const decoded = jwt_decode(token);
        axios.get('/api/users/current', decoded)
            .then(res => {
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: res.data
                })
            })
            .catch(error => {
                dispatch(logoutUser());
                window.location.href = "/login";
            })
    }
}

export const getUserList = () => dispatch => {
    axios.get(process.env.REACT_APP_API_URL + "/users")
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.response.data);
        })
}

export const deleteUser = (id) => dispatch =>{
    dispatch({
        type: SET_PENDING,
        payload: true
    });
    axios.put(process.env.REACT_APP_API_URL + "/users/" + id)
        .then(res => {
            if(res.data.success) {
                dispatch({
                    type: DELETE_USER,
                    payload: id
                })
            }
            dispatch({
                type: SET_PENDING,
                payload: false
            });
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch({
                type: SET_PENDING,
                payload: false
            });
        })
}