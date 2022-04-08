import styled from "styled-components";

export const Styles = styled.div`

    .render-area {
        width: 100%;
        min-height: 600px;
    }
    
    .actions > div {
        background-color: #f0f0f0 !important;
    }

    .row {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .render-div {
        position: relative;
        display: flex;
        align-items: center;
    }

    .slider {
        position: absolute;
        left: 0;
        display: flex;
        justify-content: space-between;
    }

    .slider-btn {
        background-color: black;
        opacity: 0.3;
        border-radius: 5px;
    }

    .btn-left {
        display: inline-block;
        font-size: 30px;
        color: white;
    }

    .btn-right {
        display: inline-block;
        font-size: 30px;
        color: white;
    }

    .ar-button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        bottom: 2rem;
        display: inline-block;
        z-index: 999999;
        width: 46px;
        padding: 0;
    }

    .ar-button:active {
        background-color: #E8EAED;
    }

    .ar-button:focus {
        outline: none;
    }

    .ar-button:focus-visible {
        outline: 1px solid #4285f4;
    }

    .ar-img {
        border-radius: 8px;
    }

    @keyframes circle {
        from { transform: translateX(-50%) rotate(0deg) translateX(50px) rotate(0deg); }
        to   { transform: translateX(-50%) rotate(360deg) translateX(50px) rotate(-360deg); }
    }

    @keyframes elongate {
        from { transform: translateX(100px); }
        to   { transform: translateX(-100px); }
    }
`;