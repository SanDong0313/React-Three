import { Link } from "react-router-dom";
import { Col, Image, Row } from 'react-bootstrap';
import { Styles } from "./styles";
import NoImage from '../../assets/default.png';
import ARImg from '../../assets/dashiconviewinar.svg';
import USDZImg from '../../assets/dashiconusdz.svg';
import GLBImg from '../../assets/dashiconglb.svg';
import ABCImg from '../../assets/bb.png';

const ProjectItem = ({ data, handleDownload, handleViewModel, actions_enable }) => {

    return (
        <Styles>
            <div className="project-item">
                <Row>
                    <Col md={2} xs={6} className="project-img">
                        {
                            data.images.length > 0 ? (
                                <img src={`/upload/${data.user}_${data.name}/${data.images[0].filename}`} className="img-upload" alt="" />
                            ) : (
                                <img src={NoImage} className="img-upload" alt="" />
                            )
                        }
                    </Col>
                    <Col md={5} xs={6} className="project-description">
                        <div className="d-inline-block">
                            <h6 className="bold ">{data.name} as ref number {data.ref_number}</h6>
                            <h6 className="">Template used: {data.template}</h6>
                            <h6 className="color-gray ">Ref: {data.ref_number}</h6>
                            <h6 className="color-gray ">Last Updated: {data.date}</h6>
                        </div>
                    </Col>
                    <Col md={2} xs={12} className="project-open">
                        {
                            data.images.length > 0 ? (data.images.filter(img => img.is_build === 0).length > 0 ? (
                                <Link to={`/template/${data.name}`} className="btn btn-green color-white my-2">Open Project</Link>
                            ) : (
                                <Link to={`/upload/${data.name}?multiple=false`} className="btn btn-green color-white my-2">Open Project</Link>
                            )) : (
                                <Link to={`/template/${data.name}`} className="btn btn-green color-white my-2">Open Project</Link>
                            )
                        }
                    </Col>
                    <Col md={3} xs={12} className="content-center-left">
                        { actions_enable && <Row>
                            <Col md={2} sm={3} xs={3}>
                                <Image className="cursor-pointer img-b-radius btn-actions" src={ARImg} width="100%" onClick={(e) => handleViewModel(data._id, e)} />
                            </Col>
                            <Col md={2} sm={3} xs={3}>
                                <Image className="cursor-pointer btn-actions" src={USDZImg} width="100%" onClick={(e) => handleDownload('usdz', data._id, e)} />
                            </Col>
                            <Col md={2} sm={3} xs={3}>
                                <Image className="cursor-pointer btn-actions" src={GLBImg} width="100%" onClick={(e) => handleDownload('glb', data._id, e)} />
                            </Col>
                            <Col md={2} sm={3} xs={3}>
                                <Image className="cursor-pointer img-b-radius btn-actions" src={ABCImg} width="100%" />
                            </Col>
                            <Col md={2} sm={3} xs={3}>
                            
                            </Col>
                        </Row>}
                    </Col>
                </Row>
            </div>
        </Styles>
    )
}

export default ProjectItem;