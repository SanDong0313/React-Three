import { useSelector } from "react-redux";
import { Styles } from "./styles";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TemplateItem = ({ template }) => {
    const { user } = useSelector(state => state.auth);

    return (
        <Styles>
            <div className="template-item">
                {
                    Object.keys(template).length > 0 && (
                        <model-viewer
                            class="template-render m-auto full-width"
                            src={`${process.env.REACT_APP_TEMPLATE_PATH}/${template.name}/${template.files.filter(f => f.filetype === "gltf")[0].filename}`}
                            ios-src={`${process.env.REACT_APP_TEMPLATE_PATH}/${template.name}/${template.files.filter(f => f.filetype === "gltf")[0].filename}`}
                            // poster={`${process.env.REACT_APP_TEMPLATE_PATH}/${template.name}/${template.files.filter(f => f.filetype === "gltf")[0].filename}`}
                            camera-orbit="0rad 1.362rad auto"
                            shadow-intensity="1"
                            ar
                            ar-modes="webxr scene-viewer quick-look fallback"
                            camera-controls
                            alt="3D model of a chair with footrest"
                        >
                            <button slot="ar-button" className="ar-button"></button>
                        </model-viewer>
                    )
                }
                <div className="template-actions">
                    <Button className="btn btn-select color-white btn-circle full-width ">Use Template</Button>
                    {
                        user.role === "admin" && (
                            <div className="mt-2 text-center">
                                <Button className="btn color-red" variant="link"><FaTrashAlt /></Button>
                                <Button className="btn color-orange" variant="link"><FaEdit /></Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </Styles>
    )
}

export default TemplateItem;