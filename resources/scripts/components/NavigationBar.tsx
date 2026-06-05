import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faLayerGroup, faSignOutAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import tw from 'twin.macro';
import styled, { keyframes } from 'styled-components/macro';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import Avatar from '@/components/Avatar';

const shimmer = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
`;

const NavWrapper = styled.div`
    width: 100%;
    background: var(--kp-bg-nav, rgba(8, 12, 24, 0.97));
    border-bottom: 1px solid var(--kp-border, rgba(30, 111, 217, 0.2));
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(30, 111, 217, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
`;

const LogoText = styled(Link)`
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    padding: 0 1.25rem;
    transition: opacity 0.2s;

    &:hover { opacity: 0.85; }

    .logo-icon {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, var(--kp-accent1, #1e6fd9), var(--kp-accent2, #3b9eff));
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        color: white;
        box-shadow: 0 0 14px var(--kp-accent-glow, rgba(59, 158, 255, 0.4));
        flex-shrink: 0;
    }

    .logo-label {
        font-size: 1.1rem;
        font-weight: 700;
        font-family: 'Inter', system-ui, sans-serif;
        letter-spacing: -0.02em;
        background: linear-gradient(135deg, #e0f0ff 0%, var(--kp-accent2, #3b9eff) 50%, var(--kp-accent1, #1e6fd9) 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: ${shimmer} 3s linear infinite;
        white-space: nowrap;
    }
`;

const RightNavigation = styled.div`
    & > a,
    & > button,
    & > .navigation-link {
        ${tw`flex items-center h-full no-underline px-4 cursor-pointer transition-all duration-200`};
        color: var(--kp-text-secondary, rgba(176, 210, 255, 0.6));
        font-size: 0.85rem;
        position: relative;

        &:hover {
            color: var(--kp-text-primary, #e0f0ff);
            background: rgba(30, 111, 217, 0.1);
        }

        &:active,
        &.active {
            color: var(--kp-accent2, #3b9eff);
            background: rgba(30, 111, 217, 0.08);

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, var(--kp-accent1, #1e6fd9), var(--kp-accent2, #3b9eff));
                border-radius: 2px 2px 0 0;
            }
        }
    }
`;

const AvatarWrap = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
    cursor: pointer;
    transition: all 0.2s;

    img {
        border-radius: 50%;
        border: 2px solid var(--kp-border, rgba(30,111,217,0.2));
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    &:hover img {
        border-color: var(--kp-accent2, #3b9eff);
        box-shadow: 0 0 10px var(--kp-accent-glow, rgba(59,158,255,0.3));
    }
`;

export default () => {
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error valid
            window.location = '/';
        });
    };

    return (
        <NavWrapper>
            <SpinnerOverlay visible={isLoggingOut} />
            <div className={'mx-auto w-full flex items-center h-[3.5rem] max-w-[1200px]'}>
                <div id={'logo'} className={'flex-1'}>
                    <LogoText to={'/'}>
                        <div className={'logo-icon'}>
                            <FontAwesomeIcon icon={faUtensils} />
                        </div>
                        <span className={'logo-label'}>Kantin Panel</span>
                    </LogoText>
                </div>
                <RightNavigation className={'flex h-full items-center justify-center'}>
                    <SearchContainer />
                    <Tooltip placement={'bottom'} content={'Dashboard'}>
                        <NavLink to={'/'} exact>
                            <FontAwesomeIcon icon={faLayerGroup} />
                        </NavLink>
                    </Tooltip>
                    {rootAdmin && (
                        <Tooltip placement={'bottom'} content={'Admin'}>
                            <a href={'/admin'} rel={'noreferrer'}>
                                <FontAwesomeIcon icon={faCogs} />
                            </a>
                        </Tooltip>
                    )}
                    <Tooltip placement={'bottom'} content={'Logout'}>
                        <button onClick={onTriggerLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                    </Tooltip>
                    <AvatarWrap>
                        <NavLink to={'/account'}>
                            <Avatar.User />
                        </NavLink>
                    </AvatarWrap>
                </RightNavigation>
            </div>
        </NavWrapper>
    );
};
