import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import { store } from '@/state';
import { SiteSettings } from '@/state/settings';
import IndexRouter from '@/routers/IndexRouter';
import { history } from '@/components/history';
import '@/assets/tailwind.css';
import GlobalStylesheet from '@/assets/css/GlobalStylesheet';
import { createGlobalStyle } from 'styled-components/macro';
import { KantinGlobalCSS } from '@/kantin-theme';

/* Inject Kantin Panel global styles */
const KantinGlobal = createGlobalStyle`${KantinGlobalCSS}`;

interface ExtendedWindow extends Window {
    SiteConfiguration?: SiteSettings;
    PterodactylUser?: {
        uuid: string;
        username: string;
        email: string;
        /* eslint-disable camelcase */
        root_admin: boolean;
        use_totp: boolean;
        language: string;
        updated_at: string;
        created_at: string;
        /* eslint-enable camelcase */
    };
}

function App() {
    const siteConfiguration: SiteSettings | undefined = (window as ExtendedWindow).SiteConfiguration;
    store.getActions().settings.setSettings(siteConfiguration || {
        name: 'Kantin Panel',
        locale: 'en',
        recaptcha: { enabled: false, siteKey: '' },
    });

    return (
        <>
            <GlobalStylesheet />
            <KantinGlobal />
            <StoreProvider store={store}>
                <BrowserRouter>
                    <IndexRouter />
                </BrowserRouter>
            </StoreProvider>
        </>
    );
}

export default hot(App);
