import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components/macro';
// @ts-expect-error untyped font file
import font from '@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-display: swap;
        font-weight: 100 700;
        src: url(${font}) format('woff2-variations');
        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
    }

    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
        --accent-blue: #1e6fd9;
        --accent-blue-light: #3b9eff;
        --accent-blue-dark: #1a4faf;
        --bg-base: #0a0f1e;
        --bg-surface: #0d1526;
        --text-primary: #e0f0ff;
        --text-muted: rgba(176, 210, 255, 0.5);
        --border-subtle: rgba(30, 111, 217, 0.18);
    }

    html, body {
        min-height: 100%;
    }

    body {
        ${tw`font-sans`};
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        letter-spacing: 0.01em;
        background-color: #0a0f1e;
        color: #e0f0ff;
        position: relative;
        overflow-x: hidden;
    }

    /* Subtle background radial glow */
    body::before {
        content: '';
        position: fixed;
        inset: 0;
        z-index: -2;
        background:
            radial-gradient(circle at 15% 20%, rgba(30, 111, 217, 0.10) 0%, transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(59, 158, 255, 0.07) 0%, transparent 45%),
            linear-gradient(160deg, #0a0f1e 0%, #0d1526 55%, #0a0f1e 100%);
        pointer-events: none;
    }

    h1, h2, h3, h4, h5, h6 {
        ${tw`font-medium tracking-normal`};
        font-family: 'Inter', sans-serif;
        color: #e0f0ff;
    }

    p {
        ${tw`leading-snug`};
        font-family: 'Inter', sans-serif;
        color: rgba(176, 210, 255, 0.7);
    }

    form {
        ${tw`m-0`};
    }

    textarea, select, input {
        font-family: 'Inter', system-ui, sans-serif !important;
    }

    code, pre, .font-mono {
        font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(10, 15, 30, 0.8);
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(30, 111, 217, 0.3);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgba(59, 158, 255, 0.5);
    }

    /* Transitions */
    .fade-appear,
    .fade-enter {
        opacity: 0;
    }

    .fade-appear-active,
    .fade-enter-active {
        opacity: 1;
        transition: opacity 150ms ease-in;
    }

    .fade-exit {
        opacity: 1;
    }

    .fade-exit-active {
        opacity: 0;
        transition: opacity 150ms ease-in;
    }
`;
