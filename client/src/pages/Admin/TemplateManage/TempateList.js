import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useFileUpload from 'react-use-file-upload';
import TemplateItem from '../../../components/template/templateItem';

import { Styles } from './styles';
import { CLEAR_ERRORS } from '../../../redux/constants';
import { getTemplates, saveTemplate } from '../../../redux/actions/templateActions';

const TemplateList = () => {
    const fileRef = useRef();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [template_name, setTemplateName] = useState("");

    const { templates } = useSelector(state => state.template);
    const errors = useSelector(state => state.error);

    const {
        files,
        setFiles,
        clearAllFiles
    } = useFileUpload();

    useEffect(() => {
        dispatch(getTemplates());
    }, [dispatch])

    const handleSave = (e) => {
        e.preventDefault();

        const formData = new FormData();
        if(files.length === 0) {
            alert("No selected iamges");
            return;
        }

        for(var x = 0; x < files.length; x++) {
            formData.append('images', files[x])
        }
        formData.append("template_name", template_name);
        dispatch(saveTemplate(formData));
        if(Object.keys(errors).length === 0) {
            handleClose();
        }
        clearAllFiles();
    }

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
        dispatch({
            type: CLEAR_ERRORS
        });
    }

    const handleChange = (e) => {
        setFiles(e, 'a');
    }

    return (
        <Styles>
            <div className="container">
                <div className="text-right">
                    <Button className="ml-4" type="button" variant="primary" onClick={handleShow}>New Template</Button>
                </div>
                <div className="mt-4 template-wrapper">
                    <Row>
                        {
                            Object.keys(templates).length > 0 && (
                                templates.map((template, index) => (
                                    <Col md={4} xs={12} className="my-2" key={index}>
                                        <TemplateItem template={template} />
                                    </Col>
                                ))
                            )
                        }
                    </Row>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>New Template</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" onChange={(e) => setTemplateName(e.target.value)} placeholder="Enter your template name" />
                    {errors.name && <Form.Text className="invalid-feedback">
                        {errors.name}
                    </Form.Text>}
                    <Form.Group controlId="formFileMultiple" className="mt-3">
                        <Form.Control type="file" className="form-control" ref={fileRef} multiple onChange={handleChange} />
                        {errors.file && <Form.Text className="invalid-feedback">
                            {errors.file}
                        </Form.Text>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Styles>
    )
}

export default TemplateList;