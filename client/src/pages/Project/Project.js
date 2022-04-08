import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Styles } from './styles';
import multiDownload from 'multi-download';
import ProjectItem from '../../components/project/ProjectItem';
import { Button, Modal, Form } from 'react-bootstrap';
import { addProject, getProjects } from '../../redux/actions/projectActions';
import { CLEAR_ERRORS } from '../../redux/constants';
import { useHistory } from 'react-router';

const Project = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const errors = useSelector(state => state.error);
    const { projects, success } = useSelector(state => state.project);
    const { user } = useSelector(state => state.auth);

    const [show, setShow] = useState(false);
    const [project_name, setProjectName] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);

    // const [device, setDevice] = useState('web');

    // useEffect(() => {
    //     if(/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    //         setDevice('ios')
    //     } else if(/Android/i.test(navigator.userAgent)) {
    //         setDevice('android')
    //     } else {
    //         setDevice('web')
    //     }
    // }, [])

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    useEffect(() => {
        if(success) {
            setShow(false);
        }
    }, [success])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setIsEmpty(false);
        dispatch({
            type: CLEAR_ERRORS
        });
    }

    const handleSave = (e) => {
        e.preventDefault();
        if(project_name === "") {
            setIsEmpty(true);
            return;
        }
        setIsEmpty(false);
        dispatch(addProject({ name: project_name }));
    }

    const handleDownload = (file_type, id) => {
        const selected_project = projects.filter(p => p._id === id)[0];
        const usdz_links = [];
        const glb_links = [];
        selected_project.images.filter(img => img.is_build === 1).forEach(item => {
            usdz_links.push(`${process.env.REACT_APP_UPLOAD_PATH}/${user.id}_${selected_project.name}/${item.filename.split(".")[0]}.usdz`)
            glb_links.push(`${process.env.REACT_APP_UPLOAD_PATH}/${user.id}_${selected_project.name}/${item.filename.split(".")[0]}.glb`)
        });
        if(file_type === "usdz") {
            if(usdz_links.length > 0) {
                multiDownload(usdz_links);
            } else {
                alert("No built model")
            }
        } else {
            if (glb_links.length > 0) {
                multiDownload(glb_links);
            } else {
                alert("No built model")
            }
        }
    }

    const handleViewModel = (id) => {
        const selected_project = projects.filter(p => p._id === id)[0];
        if(selected_project.images.length > 0) {
            history.push(`/ar-build/${selected_project.name}`)
            // if(device === "web") {
            //     history.push(`/web-build/${selected_project.name}`)
            // } else if (device === "android") {
            //     history.push(`/android-build/${selected_project.name}`)
            // } else {
            //     history.push(`/ios-build/${selected_project.name}`)
            // }
        }
    }

    return (
        <Styles>
            <div className="container">
                <h2 className="text-center">All Your Project</h2>
                <h6 className="text-center">Easily edit, update and share your augmented reality project file</h6>
                <div className="project-box mt-4">
                    <div className="text-right">
                        <Button variant="primary" onClick={handleShow}>
                            New Project
                        </Button>
                    </div>
                    <div className="project-wrapper mt-2">
                        {
                            Object.keys(projects).length > 0 ? 
                                projects.map((project, index) => <ProjectItem key={index} data={project} handleDownload={handleDownload} handleViewModel={handleViewModel} actions_enable={true} />) : 
                                <p className="text-center mt-4">No Project</p>
                        }
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>New Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control type="text" placeholder="Enter your project name" onChange={(e) => setProjectName(e.target.value)} />
                        {isEmpty && <Form.Text className="invalid-feedback">
                            Project name is required
                        </Form.Text>}
                        {errors.name && <Form.Text className="invalid-feedback">
                            {errors.name}
                        </Form.Text>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Styles>
    )
}

export default Project;