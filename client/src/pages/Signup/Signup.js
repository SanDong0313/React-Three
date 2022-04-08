import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Styles } from './styles';
import { registerUser } from '../../redux/actions/userActions';
import { CLEAR_ERRORS } from '../../redux/constants';

const Signup = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isChecked, setIsChecked] = useState(false);

    const errors = useSelector(state => state.error);

    useEffect(() => {
        dispatch({
            type: CLEAR_ERRORS
        }); 
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isChecked) {
            alert("You should agree to the Terms of Service");
            return;
        }
        dispatch(registerUser(formData, history));
    }
    return (
        <Styles>
            <div className="signup-box my-4 p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h1 className="text-center">Sign Up Now</h1>
                    </div>
                    <div className="mb-4">
                        <input type="text" className="form-control input-circle" onChange={(e) => {
                            setFormData({...formData, name: e.target.value})
                        }} placeholder="Your name" />
                        { errors.name && <div className="invalid-feedback">{errors.name}</div> }
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
                    <div className="form-check mb-4">
                        <input className="form-check-input" type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(!isChecked)} />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            I agree to the Terms of Service
                        </label>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="btn full-width btn-circle btn-signup">Create An Account</button>
                    </div>
                </form>
                <hr />
                <div className="mb-2">
                    <p className="text-center">
                        Do you have an Account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </Styles>
    )
}

export default Signup;