import styled from "styled-components";

export const Styles = styled.div`

    position: relative;

    .dashboard-wrapper {
        // position: absolute;
    }

    .sidebar {
        background-color: #182444;
        padding: 10px;
    }
    
    .sidemenu {
        list-style-type: none;
        padding-left: 0 !important;
    }

    .content {
        margin-bottom: 0 !important;
    }

    .sidemenu-item {
        font-size: 10px;
        text-align: center;
        padding-top: 20px;
        cursor: pointer;
    }

    .menu-icon {
        font-size: 40px;
    }

    .dashboard-content {
        padding: 0 !important;
        background-color: #ddd
    }

    .content-header {
        width: 100%;
        background-color: #182444;
        padding: 30px;
    }

    .content-header-menu {
        list-style-type: none;
    }

    .ar-tool-box {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
    }

    .dashboard-menu {
        list-style-type: none;
        padding-left: 0 !important;
    }

    .dashboard-menu-item {
        display: inline-block
    }

    @media (max-width: 576px) {
        .sidemenu-item {
            float: left;
        }
    }
`