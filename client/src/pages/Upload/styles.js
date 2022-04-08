import styled from "styled-components";

export const Styles = styled.div`

    @media only screen and (max-width: 600px) {
        .upload-box {
            margin-left: 20px !important;
            margin-right: 20px !important;
            padding-left: 15px !important;
            padding-right: 15px !important;
        }
    }

    padding-top: 70px;

    .upload-box {
        border: 2px solid #ddd;
        border-radius: 8px;
        max-width: 550px;
        margin: auto;
        padding: 30px;
    }

    .upload_back {
        width: 100%;
        border-radius: 10px;
    }

    .btn-select {
        background-color: #25dac5 !important;
        border-color: #25dac5 !important;
        border-radius: 25px !important;
    }

    .btn-upload {
        color: #25dac5 !important;
        border-color: #25dac5 !important;
        border-radius: 25px !important;
    }

    .btn-upload:hover {
        color: #25dac5;
        background-color: #eee !important;
    }

    .btn-build {
        background-color: #e93a7d !important;
        border-color: #e93a7d !important;
        border-radius: 25px;
    }
`