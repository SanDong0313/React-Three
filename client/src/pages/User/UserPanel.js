import { Row, Col, Container } from 'react-bootstrap';
import { FaList, FaDesktop, FaThemeco, FaRProject } from 'react-icons/fa';
import { Link, Route } from 'react-router-dom';
import Project from '../Project/Project';
import ARTool from './ARTool';
import UserDashboard from './Dashboard';
import { Styles } from "./styles";

const UserPanel = () => {

    return (
        <Styles>
            <Container fluid className="p-0 dashboard-wrapper full-height">
                <Row className="full-width m-0 full-height" style={{minHeight: '600px'}}>
                    <Col sm={1} md={1} xs={12} className="sidebar">
                        <ul className="sidemenu">
                            <li className="sidemenu-item col-lg-12 col-6">
                                <Link to="/user/dashboard" className="color-white"><FaList className="menu-icon" /> <br/>Dashboard</Link>
                            </li>
                            <li className="sidemenu-item col-lg-12 col-6">
                                <Link to="/user/ar-tool" className="color-white"><FaDesktop className="menu-icon" /> <br/>2D to AR</Link>
                            </li>
                            <li className="sidemenu-item col-lg-12 col-6">
                                <Link to="/user/dashboard" className="color-white"><FaThemeco className="menu-icon" /> <br/>Templates</Link>
                            </li>
                            <li className="sidemenu-item col-lg-12 col-6">
                                <Link to="/user/projects" className="color-white"><FaRProject className="menu-icon" /> <br/>Your Project</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col sm={11} md={11} xs={12} className="dashboard-content">
                        <Route exact path="/user/dashboard" component={UserDashboard} />
                        <Route exact path="/user/ar-tool" component={ARTool} />
                        <Route exact path="/user/projects" component={Project} />
                    </Col>
                </Row>
            </Container>
        </Styles>
    )
}

export default UserPanel;