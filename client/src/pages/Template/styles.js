import styled from "styled-components";

export const Styles = styled.div`

    @media only screen and (max-width: 600px) {
        .template-box {
            padding: 20px !important;
        }
    }

    padding-top: 30px;

    .template-box {
        background-color: white;
        border-radius: 5px;
        border: 1px solid #ddd;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 10%);
        padding: 40px 20px;
    }

    .btn-select {
        min-width: 100px;
        background-color: #25dac5;
        border-color: #25dac5;
        border-radius: 20px;
        color: white !important;
        margin-left: 20px !important;
        padding: 5px 10px !important;
    }

    .three-canvas {
        width: 100%;
    }

    .three-canvas > img {
        border-radius: 10px;
    }

    .three-canvas > div {
        min-height: 300px;
    }
`