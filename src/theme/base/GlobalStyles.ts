import { createGlobalStyle } from 'styled-components';

import 'assets/fonts/stylesheet.css';

import { CSSBaseline } from './CSSBaseline';

export const GlobalStyles = createGlobalStyle`
    ${CSSBaseline}
  
    html, body {
        background-color: ${({ theme }) => theme.palette.common.white};
        color: ${({ theme }) => theme.palette.common.black};
        font-family: ${({ theme }) => theme.typography.fontFamily};
        font-style: normal;
        min-width: 360px;
        ${({ theme }) => theme.typography.body.medium}
        & > * {
            -webkit-tap-highlight-color: transparent;
            scrollbar-width: thin;
            scrollbar-color: lightgrey rgba(216, 224, 216, 1);
        }
       
        *::-webkit-scrollbar {
            width: 8px;
            border-radius: 50px;
        }
        *::-webkit-scrollbar-track {
            background: ${({ theme }) => theme.palette.grey.bg1};
            border-radius: 50px;
            width: 100%;
        }
        *::-webkit-scrollbar-thumb {
            background-color: blue;
            border-radius: 50px;
            background-color: #dcdcdc;
        }

        &[data-preview="true"] {
            overflow: hidden;
        }
    }

    @supports (-webkit-overflow-scrolling: touch) {
        input {
            font-size: 16px;
        }
    }

   html, body, #root {
        min-height: 100vh;
        min-height: -webkit-fill-available;
        height: 100%;
        overflow-x: hidden;
    }

    body.modal-open {
        height: 100vh;
        height: -webkit-fill-available;
        overflow-y: hidden;
    }
   
    svg {
        display: block;
    }
    .ReactModal__Overlay {
        z-index: 1800 !important;
    }
   
   .svg-color-inherit {
        svg {
            * {
                &[stroke] {
                    stroke: currentColor;
                }
                &[fill] {
                    fill: currentColor;
                }
            }
        }
   }

   strong {
    font-weight: bold;
   }
   em {
    font-style: italic;
   }

   .SnackbarContent-root {
        padding: 32px 40px !important;
        border-radius: 16px !important;
        display: flex;
        justify-content: center;
        .SnackbarItem-message {
            padding: 0 !important;
            font-size: 16px;
        }
        &.SnackbarItem-variantSuccess {
            background-color: ${({ theme }) =>
                theme.palette.green.gamma} !important;
            color: black !important;
        }
   }

   .react-tooltip {
        user-select: none;
        border-radius: 8px !important;
        box-shadow: 0 0 20px rgba(0,0,0, 0.2);
        
        &.show {
            opacity: 1 !important;
        }

        white-space: pre-line
    }

    
`;
