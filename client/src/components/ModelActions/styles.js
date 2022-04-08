import styled from "styled-components";

export const Styles = styled.div`

    @media only screen and (max-width: 600px) {
        .action-item {
            border-bottom: 1px solid #ddd !important;
        }
    }

    padding-top: 20px;
    padding-bottom: 20px;

    .action-item {
        border-bottom: none;
    }

    .btn-download {
        background-color: #25dac5;
        border-color: #25dac5;
        border-radius: 20px;
        color: white !important;
        margin-left: 20px !important;
        padding: 5px 10px !important;
    }

    .btn-download:hover {
        background-color: #25dac5;
    }

`;