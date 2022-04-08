import { Col, Container, Form, Row } from "react-bootstrap";
import { Styles } from './styles';

const ARTool = () => {
    return (
        <Styles>
            <Container className="my-4">
                <h3>2D to AR Convertions Tool</h3>
                <h6 className="color-gray">Apply your 2D designs onto 3D product templates to replicate real world products in AR for your store</h6>
                <div className="my-4 ar-tool-box">
                    <Row>
                        <Col md={3}>

                        </Col>
                        <Col md={9} xs={12}>
                            <h4>3D Preview</h4>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col md={3} xs={12}>
                            <Form.Group controlId="formBasicCheckbox1">
                                <Form.Check type="checkbox" label="Select your image" />
                            </Form.Group>
                        </Col>
                        <Col md={9} xs={12}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" className="form-control" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-4 mt-4">
                        <Col md={3} xs={12}>
                            <Form.Group controlId="formBasicCheckbox2">
                                <Form.Check type="checkbox" label="Select 3D template" />
                            </Form.Group>
                        </Col>
                        <Col md={9} xs={12}>
                            
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={3} xs={12}>
                            <Form.Group controlId="formBasicCheckbox3">
                                <Form.Check type="checkbox" label="Build 3D & AR" />
                            </Form.Group>
                        </Col>
                        <Col md={2} xs={12}>
                            <Form.Group controlId="formBasicCheckbox4">
                                <Form.Check type="checkbox" label="Previous" />
                            </Form.Group>
                        </Col>
                        <Col md={7} xs={12}>
                            <h6 className="color-gray">
                                Successfully converted you can download USDZ for IOS device and GLB for Android
                            </h6>
                            <div className="d-inline-block">
                                
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Styles>
    )
}

export default ARTool;