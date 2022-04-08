import styled from "styled-components";

export const Styles = styled.div`

    @media only screen and (max-width: 600px) {
        .btn-actions {
            max-width: 100px;
        }
        .project-description {
            
        }
        .project-text {
            font-size: 14px;
        }
    }

    .project-item {
        border-bottom: 1px solid #c5c1c1;
        padding: 15px;
    }

    .project-open, .project-img {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .img-b-radius {
        border-radius: 3px;
    }

    .img-upload {
        max-width: 150px;
        width: 100%;
        border-radius: 5px;
    }

    .project-text {
        font-size: 16px;
    }

    .btn-green {
        background-color: #25dac5;
        border-color: #25dac5;
    }

    .btn-green:hover {
        background-color: #25dac5;
    }
`