/* ============================================================
 * KANTIN PANEL - Theme Config
 * Edit variabel di sini untuk kustomisasi warna & background
 * ============================================================ */

export const KantinTheme = {
    /* --- Background --- */
    bgPage: 'var(--kp-bg-page, #080c18)',
    bgSurface: 'var(--kp-bg-surface, rgba(10, 15, 30, 0.92))',
    bgCard: 'var(--kp-bg-card, rgba(13, 21, 38, 0.88))',
    bgNav: 'var(--kp-bg-nav, rgba(8, 12, 24, 0.97))',

    /* --- Accent --- */
    accent1: 'var(--kp-accent1, #1e6fd9)',
    accent2: 'var(--kp-accent2, #3b9eff)',
    accentGlow: 'var(--kp-accent-glow, rgba(59, 158, 255, 0.35))',

    /* --- Text --- */
    textPrimary: 'var(--kp-text-primary, #e0f0ff)',
    textSecondary: 'var(--kp-text-secondary, rgba(176, 210, 255, 0.6))',
    textMuted: 'var(--kp-text-muted, rgba(176, 210, 255, 0.3))',

    /* --- Border --- */
    border: 'var(--kp-border, rgba(30, 111, 217, 0.2))',
    borderHover: 'var(--kp-border-hover, rgba(59, 158, 255, 0.4))',

    /* --- Status --- */
    statusOnline: '#4ade80',
    statusOffline: '#f87171',
    statusStarting: '#fbbf24',

    /* --- Panel Name --- */
    panelName: 'Kantin Panel',
};

/* Global CSS variables — injected at app root */
export const KantinGlobalCSS = `
    :root {
        --kp-bg-page: #080c18;
        --kp-bg-surface: rgba(10, 15, 30, 0.92);
        --kp-bg-card: rgba(13, 21, 38, 0.88);
        --kp-bg-nav: rgba(8, 12, 24, 0.97);
        --kp-accent1: #1e6fd9;
        --kp-accent2: #3b9eff;
        --kp-accent-glow: rgba(59, 158, 255, 0.35);
        --kp-text-primary: #e0f0ff;
        --kp-text-secondary: rgba(176, 210, 255, 0.6);
        --kp-text-muted: rgba(176, 210, 255, 0.3);
        --kp-border: rgba(30, 111, 217, 0.2);
        --kp-border-hover: rgba(59, 158, 255, 0.4);
        --kp-bg-custom: none;
    }

    /* Custom background image support */
    body::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: var(--kp-bg-custom);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: 0.15;
        pointer-events: none;
        z-index: 0;
    }

    body {
        background: var(--kp-bg-page) !important;
        color: var(--kp-text-primary) !important;
        font-family: 'Inter', system-ui, sans-serif !important;
        position: relative;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
    ::-webkit-scrollbar-thumb { background: var(--kp-accent1); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--kp-accent2); }

    /* Selection */
    ::selection { background: rgba(59,158,255,0.3); color: #fff; }

    /* All gray text overrides */
    .text-gray-200, .text-gray-300, .text-gray-400 { color: var(--kp-text-secondary) !important; }
    .text-gray-500, .text-gray-600 { color: var(--kp-text-muted) !important; }
    .text-gray-50, .text-gray-100 { color: var(--kp-text-primary) !important; }

    /* Card / bg overrides */
    .bg-gray-700, .bg-gray-800, .bg-gray-900 {
        background: var(--kp-bg-card) !important;
        border: 1px solid var(--kp-border) !important;
    }

    /* Input fields */
    input, textarea, select {
        background: rgba(8, 12, 24, 0.8) !important;
        border-color: var(--kp-border) !important;
        color: var(--kp-text-primary) !important;
    }
    input:focus, textarea:focus, select:focus {
        border-color: var(--kp-accent2) !important;
        box-shadow: 0 0 0 2px var(--kp-accent-glow) !important;
        outline: none !important;
    }

    /* Buttons primary */
    button[type="submit"], .btn-primary {
        background: linear-gradient(135deg, var(--kp-accent1), var(--kp-accent2)) !important;
        border: none !important;
        color: white !important;
    }

    /* Fade transition */
    .fade-appear, .fade-enter { opacity: 0; transform: translateY(6px); }
    .fade-appear-active, .fade-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 200ms ease, transform 200ms ease;
    }
`;
