import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectItem from '../../components/project/ProjectItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../redux/actions/projectActions';
import { Styles } from "./styles";

const UserDashboard = () => {

    const dispatch = useDispatch();

    const { projects } = useSelector(state => state.project);

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    return (
        <Styles>
            <div className="content-header text-center color-white">
                <ul className="dashboard-menu">
                    <li className="dashboard-menu-item"><Link to="/" className="color-white px-4">Publish 2D images into Web AR</Link></li>
                    <li className="dashboard-menu-item"><Link to="/" className="color-white px-4">3D Templates</Link></li>
                </ul>
            </div>
            <div className="container py-4">
                <h3 className="pb-2 border-bottom">All your projects</h3>
                {
                    (projects !== undefined && Object.keys(projects).length > 0) && (
                        projects.map((p, index) => (
                            <ProjectItem data={p} actions_enable={false} key={index} />
                        ))
                    )
                }
            </div>
        </Styles>
    )
}

export default UserDashboard;