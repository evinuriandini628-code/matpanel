const colors = require('tailwindcss/colors');

const gray = {
    50: 'hsl(216, 33%, 97%)',
    100: 'hsl(214, 15%, 91%)',
    200: 'hsl(210, 16%, 82%)',
    300: 'hsl(211, 13%, 65%)',
    400: 'hsl(211, 10%, 53%)',
    500: 'hsl(211, 12%, 43%)',
    600: 'hsl(209, 14%, 37%)',
    700: 'hsl(209, 18%, 30%)',
    800: 'hsl(209, 20%, 25%)',
    900: 'hsl(210, 24%, 16%)',
};

// Custom gradient colors for enhanced theme
const customColors = {
    neon: {
        cyan: '#00f5ff',
        purple: '#b537f2',
        pink: '#ff006e',
        blue: '#0096ff',
    },
    cyber: {
        50: '#e0f7ff',
        100: '#b3e9ff',
        200: '#80dbff',
        300: '#4dcdff',
        400: '#26c2ff',
        500: '#00b8ff',
        600: '#00a3e6',
        700: '#008acc',
        800: '#0071b3',
        900: '#004d80',
    },
};

module.exports = {
    content: [
        './resources/scripts/**/*.{js,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                header: ['"Inter"', '"Space Grotesk"', '"IBM Plex Sans"', '"Roboto"', 'system-ui', 'sans-serif'],
                sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
                mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
            },
            colors: {
                black: '#0a0e14',
                // "primary" and "neutral" are deprecated, prefer the use of "blue" and "gray"
                // in new code.
                primary: colors.blue,
                gray: gray,
                neutral: gray,
                cyan: colors.cyan,
                neon: customColors.neon,
                cyber: customColors.cyber,
            },
            fontSize: {
                '2xs': '0.625rem',
            },
            transitionDuration: {
                250: '250ms',
                350: '350ms',
            },
            borderColor: theme => ({
                default: theme('colors.neutral.400', 'currentColor'),
            }),
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            boxShadow: {
                'glow-cyan': '0 0 20px rgba(0, 245, 255, 0.5)',
                'glow-purple': '0 0 20px rgba(181, 55, 242, 0.5)',
                'glow-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glass-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.5)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'gradient-shift': 'gradientShift 15s ease infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                gradientShift: {
                    '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '33%': { transform: 'translate(5%, 5%) rotate(120deg)' },
                    '66%': { transform: 'translate(-5%, 5%) rotate(240deg)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ]
};
