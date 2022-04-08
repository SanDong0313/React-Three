import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../../assets/logo.png'
import { FaTwitter, FaFacebookSquare, FaGooglePlusG } from 'react-icons/fa';
import { Styles } from './styles';

const Footer = () => {
    return (
        <Styles>
            <div className="footer mt-4">
                <Container className="p-4">
                    <Row className="header p-4">
                        <Col md={6} sm={6} xs={12} lg={4} className="about-templates">
                            <Link to="/home" className="btn btn-link bold">About</Link>
                            <Link to="/home" className="btn btn-link bold">More Templates</Link>
                        </Col>
                        <Col md={4} sm={6} xs={12} lg={4} className="text-center">
                            <img src={Logo} alt="" />
                        </Col>
                        <Col md={4} lg={4} sm={12} xs={12} className="social-sharing">
                            <Link to="/home" className="btn btn-link bold">
                                <FaTwitter />
                            </Link>
                            <Link to="/home" className="btn btn-link bold">
                                <FaFacebookSquare />
                            </Link>
                            <Link to="/home" className="btn btn-link bold">
                                <FaGooglePlusG />
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            All right reserved Seevar.com
                        </Col>
                    </Row>
                </Container>
            </div>
        </Styles>
    )
}

export default Footer;