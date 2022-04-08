import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import { logoutUser } from '../../redux/actions/userActions';
import { GoThreeBars } from 'react-icons/go';
import { Styles } from './styles';
import { useState } from 'react';
import { useEffect } from 'react';

const Header = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const [header_show, setHeaderShow] = useState(false);
    const [device, setDevice] = useState("web");

    useEffect(() => {
        if(window.innerWidth < 600) {
            setDevice("mobile");
        }
    }, [])

    return (
        <Styles>
            <Container className="p-4">
                <Row className="header p-4">
                    <Col md={2} xs={12} className="logo">
                        <img src={Logo} className="logo-img" alt="" />
                        <Button className="btn btn-link color-black nav-menu-icon" variant="link" onClick={(e) => setHeaderShow(!header_show)}><GoThreeBars fontSize={28} /></Button>
                    </Col>
                    {
                        device === "mobile" ? (header_show && <Col md={10} xs={12} className="header-menu">
                            <Row>
                                <Col md={9} className="text-center nav-menu">
                                    <Link to="/user/dashboard" className="btn btn-link bold">Home</Link>
                                    <Link to="/template_manage" className="btn btn-link bold">Templates</Link>
                                    {
                                        user.role === "admin" && (
                                        <>
                                            <Link to="/user_manage" className="btn btn-link bold">User</Link>
                                        </>
                                        )
                                    }
                                </Col>
                                <Col md={3} className="text-right auth-actions">
                                    {
                                        isAuthenticated ? (
                                            <Link to="/login" onClick={(e) => dispatch(logoutUser())} className="btn btn-link bold">Sign Out</Link>
                                        ) : (<>
                                            <Link to="/login" className="btn btn-link bold">Sign In</Link>
                                            <Link to="/signup" className="btn btn-signup bold">Sign Up</Link>
                                        </>)
                                    }
                                </Col>

                            </Row>
                        </Col>) : (
                            <Col md={10} xs={12} className="header-menu">
                                <Row>
                                    <Col md={9} className="text-center nav-menu">
                                        <Link to="/user/dashboard" className="btn btn-link bold">Home</Link>
                                        <Link to="/template_manage" className="btn btn-link bold">Templates</Link>
                                        {
                                            user.role === "admin" && (
                                            <>
                                                <Link to="/user_manage" className="btn btn-link bold">User</Link>
                                            </>
                                            )
                                        }
                                    </Col>
                                    <Col md={3} className="text-right auth-actions">
                                        {
                                            isAuthenticated ? (
                                                <Link to="/login" onClick={(e) => dispatch(logoutUser())} className="btn btn-link bold">Sign Out</Link>
                                            ) : (<>
                                                <Link to="/login" className="btn btn-link bold">Sign In</Link>
                                                <Link to="/signup" className="btn btn-signup bold">Sign Up</Link>
                                            </>)
                                        }
                                    </Col>

                                </Row>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </Styles>
    )
}

export default Header;