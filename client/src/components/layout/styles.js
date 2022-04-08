import styled from "styled-components";

export const Styles = styled.div`

    @media only screen and (max-width: 600px) {
        .header {
            padding: 0 !important;
        }
        .nav-menu-icon {
            display: inline-block !important;
        }
        .logo {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .nav-menu {
            text-align: left !important;
        }
        .auth-actions {
            text-align: left !important;
        }
        .social-sharing {
            text-align: center !important;
            display: content !important;
        }
        .about-templates {
            text-align: center !important;
        }
    }

    .about-templates {
        text-align: left;
    }
    
    .social-sharing {
        text-align: right;
        display: block;
    }

    .nav-menu {
        text-align: center;
    }

    .nav-menu-icon {
        display: none;
    }

    .logo-img {
        max-width: 200px;
        width: 100%;
    }

    .auth-actions {
        text-align: right;
    }

`