import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../redux/actions/userActions';
import { CLEAR_ERRORS } from '../../redux/constants';
import { Styles } from './styles';

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const errors = useSelector(state => state.error);
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }, [dispatch]);

    useEffect(() => {
        if(isAuthenticated) {
            history.push('/user/dashboard');
        }
    }, [history, isAuthenticated]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData))
    }
    return (
        <Styles>
            <div className="signup-box my-4 p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h1 className="text-center">Sign In</h1>
                    </div>
                    <div className="mb-4">
                        <input type="email" className="form-control input-circle" onChange={(e) => {
                            setFormData({...formData, email: e.target.value})
                        }} placeholder="Your email" />
                        { errors.email && <div className="invalid-feedback">{errors.email}</div> }
                    </div>
                    <div className="mb-4">
                        <input type="password" className="form-control input-circle" onChange={(e) => {
                            setFormData({...formData, password: e.target.value})
                        }} placeholder="Your password" />
                        { errors.password && <div className="invalid-feedback">{errors.password}</div> }
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="btn full-width btn-circle btn-signup">Sign In</button>
                    </div>
                </form>
                <hr />
                <div className="mb-2">
                    <p className="text-center">
                        Don't you have an Account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </Styles>
    )
}

export default Login;