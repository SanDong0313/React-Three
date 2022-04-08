import { useParams } from "react-router";
import { Styles } from "./styles";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import defaultImage from '../../assets/ecommerce_2_product_3.jpg'

const ChooseTemplate = () => {
    const { project_name } = useParams();

    return (
        <Styles>
            <Container>
                <h2 className="text-center">Select a 3D template</h2>
                <Row className="mt-4">
                    <Col md={6} xs={12} className="my-2">
                        <div className="template-box text-center">
                            <h4 className="text-center bold color-gray">Convert One Image</h4>
                            <div className="three-canvas">
                                <img src={defaultImage} className="canvas-image" width="100%" alt="" />
                            </div>
                            <Link to={`/upload/${project_name}?multiple=false`} className="btn btn-select mt-4">Select</Link>
                        </div>
                    </Col>
                    <Col md={6} xs={12} className="my-2">
                        <div className="template-box text-center">
                            <h4 className="text-center bold color-gray">Convert Multiple Image</h4>
                            <div className="three-canvas">
                                <img src={defaultImage} className="canvas-image" width="100%" alt="" />
                            </div>
                            <Link to={`/upload/${project_name}?multiple=true`} className="btn btn-select mt-4">Select</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Styles>
    )
}

export default ChooseTemplate;