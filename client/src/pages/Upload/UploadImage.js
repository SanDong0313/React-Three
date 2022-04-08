import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import { Button } from "react-bootstrap";
import useFileUpload from 'react-use-file-upload';
import multiDownload from 'multi-download';
import * as THREE from 'three';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import ModelActions from "../../components/ModelActions/ModelActions";

import { Styles } from "./styles";

import { getProject, uploadImages, buildImage } from "../../redux/actions/projectActions";
import { SET_PENDING } from "../../redux/constants";
import defaultImage from '../../assets/ecommerce_2_product_3.jpg';


const UploadImage = () => {
    const history = useHistory();
    const location = useLocation();
    const inputRef = useRef();
    const dispatch = useDispatch();
    const { project_name } = useParams();
    const parsed = queryString.parse(location.search);
    const key = Object.keys(parsed)[0];
    const multiple = parsed[key];

    const [isValid, setIsValid] = useState(true);

    const { project } = useSelector(state => state.project);
    const { user } = useSelector(state => state.auth);

    // const [device, setDevice] = useState('normal');

    // useEffect(() => {
    //     if(/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    //         setDevice('ios')
    //     } else if(/Android/i.test(navigator.userAgent)) {
    //         setDevice('android')
    //     } else {
    //         setDevice('normal')
    //     }
    // }, [])

    useEffect(() => {
        dispatch(getProject(project_name))
    }, [project_name, dispatch]);

    const {
        files,
        setFiles,
        clearAllFiles
    } = useFileUpload();

    const handleUpload = (e) => {
        e.preventDefault();

        if (!isValid) {
            alert("Please upload JPG, JPEG file");
            return;
        }

        const formData = new FormData();
        if (files.length === 0) {
            alert("No selected iamges");
            return;
        } else if (files.length === 1) {
            formData.append("images", files[0]);
        } else {
            for (var x = 0; x < files.length; x++) {
                formData.append('images', files[x])
            }
        }
        formData.append("project_name", project_name);

        dispatch(uploadImages(formData));
        clearAllFiles();
    }

    const handleChange = (e) => {
        if (!checkMimeType(e)) {
            setIsValid(false);
            return;
        }
        setIsValid(true);
        setFiles(e, 'a');
    }

    const checkMimeType = (event) => {
        let files = event.target.files
        let err = ''
        const types = ['image/jpg', 'image/jpeg'];
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + ' is not a supported format\n';
            }
        };

        if (err !== '') {
            return false;
        }
        return true;
    }

    const handleBuildImage = () => {
        const upload_files = project.images.filter(img => img.is_build === 0);
        build(upload_files);
    }

    const build = (upload_files) => {
        dispatch({
            type: SET_PENDING,
            payload: true
        });

        const formData = new FormData();
        formData.append("project_name", project_name);
        let loop = 0;

        upload_files.forEach(async file => {

            const textureLoader = await new THREE.TextureLoader();
            const texture = textureLoader.load(`${process.env.REACT_APP_UPLOAD_PATH}/${project.user}_${project.name}/${file.filename}`);
            texture.flipY = false;

            const loader = await new GLTFLoader().setPath(`${process.env.REACT_APP_TEMPLATE_PATH}/Default/`);
            loader.load('ProjectName.gltf', async function (gltf) {

                const model = await gltf.scene;

                await model.traverse((child) => {
                    if (child.isMesh && child.name === "Image_Plane") {
                        child.material.map = texture;
                    }
                });

                const exporter = await new USDZExporter();
                const arraybuffer = await exporter.parse(gltf.scene);
                const usdz = await new Blob([arraybuffer], { type: 'application/octet-stream' });

                const gltfExporter = await new GLTFExporter();
                let glb = null;
                await gltfExporter.parse(gltf.scene, async (result) => {
                    if (result instanceof ArrayBuffer) {
                        glb = await new Blob([result], { type: 'application/octet-stream' });
                    } else {
                        const output = JSON.stringify(result, null, 2);
                        glb = await new Blob([output], { type: 'text/plain' });
                    }

                    formData.append("usdz", usdz);
                    formData.append("glb", glb);

                    loop++;
                    if (loop === upload_files.length) {
                        dispatch(buildImage(formData))
                    }

                }, { binary: true });
            });
        })
    }

    const handleDownload = (file_type) => {
        const usdz_links = [];
        const glb_links = [];
        project.images.filter(img => img.is_build === 1).forEach(data => {
            usdz_links.push(`${process.env.REACT_APP_UPLOAD_PATH}/${user.id}_${project.name}/${data.filename.split(".")[0]}.usdz`)
            glb_links.push(`${process.env.REACT_APP_UPLOAD_PATH}/${user.id}_${project.name}/${data.filename.split(".")[0]}.glb`)
        });
        if (file_type === "usdz") {
            if (usdz_links.length > 0) {
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
        if (project.images.length > 0) {
            history.push(`/ar-build/${project.name}`)
            // if(device === "web") {
            //     history.push(`/web-build/${selected_project.name}`)
            // } else if (device === "android") {
            //     history.push(`/android-build/${selected_project.name}`)
            // } else {
            //     history.push(`/ios-build/${selected_project.name}`)
            // }
        } else {
            alert("Please upload image and build now")
        }
    }

    return (
        <Styles>
            <div className="upload-box">
                <div className="row">
                    <h3 className="text-center">Frame 1</h3>
                    <div className="col-12">
                        <img src={defaultImage} className="upload_back" alt="" />
                    </div>
                    <form onSubmit={handleUpload}>
                        <div className="col-12 mt-4">
                            <Button
                                type="button"
                                className="btn btn-lg btn-select full-width bold color-white"
                                onClick={() => inputRef.current.click()}
                            >
                                Select Image
                            </Button>
                            {!isValid && <div className="invalid-feedback">Invalid File Format(Please upload JPG, JPEG file)</div>}
                            {
                                multiple === "true" ? (
                                    <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={handleChange} />
                                ) : (
                                    <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={handleChange} />
                                )
                            }
                        </div>
                        <div className="col-12 mt-4">
                            <Button type="submit" className="btn btn-lg btn-upload full-width bold" variant="outline-success">Upload Image</Button>
                        </div>
                    </form>
                    {
                        (Object.keys(project).length > 0 && project.images.filter(img => img.is_build === 0).length > 0) && (
                            <div className="col-12 mt-4">
                                <Button onClick={handleBuildImage} className="btn btn-lg btn-build full-width bold color-white">Build Now</Button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="container my-4">
                <ModelActions handleDownload={handleDownload} handleViewModel={handleViewModel} />
            </div>
        </Styles>
    )
}

export default UploadImage;