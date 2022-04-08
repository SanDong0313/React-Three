import styled from "styled-components";

export const Styles = styled.div`

    @media only screen and (max-width: 600px) {
        padding: 20px !important;
    }

    padding: 50px;

    .signup-box {
        background-color: white;
        max-width: 400px;
        margin: auto;
        box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 10%);
        border-radius: 4px;
    }

    .input-circle {
        border-radius: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .btn-circle {
        border-radius: 20px;
    }

    .btn-signup {
        margin-left: 0 !important;
    }
`