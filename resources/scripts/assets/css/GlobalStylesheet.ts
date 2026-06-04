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

    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

    :root {
        --accent-purple: #8b5cf6;
        --accent-violet: #a78bfa;
        --accent-pink: #ec4899;
        --accent-indigo: #6366f1;
        --glass-bg: rgba(30, 27, 46, 0.6);
        --glass-border: rgba(167, 139, 250, 0.18);
    }

    html, body {
        min-height: 100%;
    }

    body {
        ${tw`font-sans text-neutral-200`};
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        letter-spacing: 0.015em;
        background-color: #16121f;
        position: relative;
        overflow-x: hidden;
    }

    /* Animated gradient aurora background applied to the whole app */
    body::before {
        content: '';
        position: fixed;
        inset: 0;
        z-index: -2;
        background:
            radial-gradient(circle at 15% 20%, rgba(139, 92, 246, 0.28) 0%, transparent 45%),
            radial-gradient(circle at 85% 25%, rgba(236, 72, 153, 0.22) 0%, transparent 45%),
            radial-gradient(circle at 50% 90%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
            linear-gradient(160deg, #16121f 0%, #1a1530 55%, #140f24 100%);
        background-size: 200% 200%;
        animation: auroraShift 22s ease infinite;
    }

    /* Subtle floating orbs for depth */
    body::after {
        content: '';
        position: fixed;
        inset: -30%;
        z-index: -1;
        background:
            radial-gradient(circle at 20% 30%, rgba(167, 139, 250, 0.10) 0%, transparent 25%),
            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.08) 0%, transparent 25%);
        animation: orbFloat 18s ease-in-out infinite;
        pointer-events: none;
    }

    @keyframes auroraShift {
        0%, 100% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
    }

    @keyframes orbFloat {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(4%, -4%); }
    }

    h1, h2, h3, h4, h5, h6 {
        ${tw`font-medium tracking-normal`};
        font-family: 'Space Grotesk', 'Inter', sans-serif;
    }

    p {
        ${tw`text-neutral-200 leading-snug`};
        font-family: 'Inter', sans-serif;
    }

    form {
        ${tw`m-0`};
    }

    textarea, select, input, button, button:focus, button:focus-visible {
        ${tw`outline-none`};
    }

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield !important;
    }

    /* Scroll Bar Style - purple themed */
    ::-webkit-scrollbar {
        background: none;
        width: 14px;
        height: 14px;
    }

    ::-webkit-scrollbar-thumb {
        border: solid 0 rgb(0 0 0 / 0%);
        border-right-width: 4px;
        border-left-width: 4px;
        -webkit-border-radius: 9px 4px;
        -webkit-box-shadow: inset 0 0 0 1px rgba(167, 139, 250, 0.6), inset 0 0 0 4px rgba(139, 92, 246, 0.45);
    }

    ::-webkit-scrollbar-thumb:hover {
        -webkit-box-shadow: inset 0 0 0 1px rgba(192, 132, 252, 0.9), inset 0 0 0 4px rgba(167, 139, 250, 0.7);
    }

    ::-webkit-scrollbar-track-piece {
        margin: 4px 0;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        border-right-width: 0;
        border-left-width: 0;
        border-top-width: 4px;
        border-bottom-width: 4px;
        -webkit-border-radius: 4px 9px;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }
`;
