import { Col, Row, Image, Button } from "react-bootstrap";
import { Styles } from "./styles";
import ARImg from '../../assets/dashiconviewinar.svg';
import USDZImg from '../../assets/dashiconusdz.svg';
import GLBImg from '../../assets/dashiconglb.svg';

const ModelActions = ({ handleDownload, handleViewModel }) => {
    
    return (
        <Styles>
            <div className="container">
                <Row>
                    <Col md={4} xs={12} className="d-flex py-1 action-item">
                        <Image src={ARImg} width={100} />
                        <div className="px-2">
                            <h4>VIEW AR</h4>
                            <h6 className="color-gray">You can view AR only if you use IOS or Android devices</h6>
                            <Button className="btn-download" variant="success" onClick={handleViewModel}>View AR</Button>
                        </div>
                    </Col>
                    <Col md={4} xs={12} className="d-flex py-1 action-item">
                        <Image src={USDZImg} width={100} />
                        <div className="px-2">
                            <h4>DOWNLOAD USDZ</h4>
                            <h6 className="color-gray">
                                USDZ is an AR file that works on all IOS device. You can share the file via social media or a text message
                            </h6>
                            <Button className="btn-download" variant="success" onClick={(e) => handleDownload('usdz', e)}>Download</Button>
                        </div>
                    </Col>
                    <Col md={4} xs={12} className="d-flex py-1 action-item">
                        <Image src={GLBImg} width={100} />
                        <div className="px-2">
                            <h4>DOWNLOAD GLB</h4>
                            <h6 className="color-gray">
                                GLB is an Android file that works on all Android device. You can share the file via social medai or a text message
                            </h6>
                            <Button className="btn-download" variant="success" onClick={(e) => handleDownload('glb', e)}>Download</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Styles>
    )
}

export default ModelActions;