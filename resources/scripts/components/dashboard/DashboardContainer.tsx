import React, { useEffect, useState } from 'react';
import { Server } from '@/api/server/getServer';
import getServers from '@/api/getServers';
import ServerRow from '@/components/dashboard/ServerRow';
import Spinner from '@/components/elements/Spinner';
import PageContentBlock from '@/components/elements/PageContentBlock';
import useFlash from '@/plugins/useFlash';
import { useStoreState } from 'easy-peasy';
import { usePersistedState } from '@/plugins/usePersistedState';
import Switch from '@/components/elements/Switch';
import tw from 'twin.macro';
import useSWR from 'swr';
import { PaginatedResult } from '@/api/http';
import Pagination from '@/components/elements/Pagination';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faUtensils, faSearch } from '@fortawesome/free-solid-svg-icons';

const WelcomeBanner = styled.div`
    border-radius: 16px;
    background: var(--kp-bg-card, rgba(13, 21, 38, 0.88));
    border: 1px solid var(--kp-border, rgba(30, 111, 217, 0.2));
    padding: 1.5rem 1.75rem;
    margin-bottom: 1.5rem;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(12px);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--kp-accent2, #3b9eff), transparent);
        opacity: 0.4;
    }

    &::after {
        content: '';
        position: absolute;
        top: -60%;
        right: -5%;
        width: 280px;
        height: 280px;
        background: radial-gradient(circle, var(--kp-accent-glow, rgba(59, 158, 255, 0.08)) 0%, transparent 70%);
        pointer-events: none;
    }

    .title {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--kp-text-primary, #e0f0ff);
        font-family: 'Inter', system-ui, sans-serif;
        margin-bottom: 4px;
        letter-spacing: -0.01em;
    }

    .subtitle {
        font-size: 0.8rem;
        color: var(--kp-text-muted, rgba(176, 210, 255, 0.35));
    }

    .icon-wrap {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--kp-accent1, #1e6fd9), var(--kp-accent2, #3b9eff));
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.15rem;
        color: white;
        box-shadow: 0 0 20px var(--kp-accent-glow, rgba(59, 158, 255, 0.35));
        flex-shrink: 0;
    }
`;

const SectionLabel = styled.div`
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--kp-accent2, rgba(59, 158, 255, 0.7));
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 8px;

    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, var(--kp-border, rgba(30, 111, 217, 0.25)), transparent);
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 3rem 1rem;
    color: var(--kp-text-muted, rgba(176, 210, 255, 0.35));

    .icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        opacity: 0.3;
    }

    p {
        font-size: 0.9rem;
    }
`;

export default () => {
    const { search } = useLocation();
    const defaultPage = Number(new URLSearchParams(search).get('page') || '1');

    const [page, setPage] = useState(!isNaN(defaultPage) && defaultPage > 0 ? defaultPage : 1);
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const uuid = useStoreState((state) => state.user.data!.uuid);
    const username = useStoreState((state) => state.user.data!.username);
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const [showOnlyAdmin, setShowOnlyAdmin] = usePersistedState(`${uuid}:show_all_servers`, false);

    const { data: servers, error } = useSWR<PaginatedResult<Server>>(
        ['/api/client/servers', showOnlyAdmin && rootAdmin, page],
        () => getServers({ page, type: showOnlyAdmin && rootAdmin ? 'admin' : undefined }),
    );

    useEffect(() => {
        if (!servers) return;
        if (servers.pagination.currentPage > 1 && !servers.items.length) {
            setPage(1);
        }
    }, [servers?.pagination.currentPage]);

    useEffect(() => {
        clearFlashes('dashboard');
        clearAndAddHttpError({ key: 'dashboard', error });
    }, [error]);

    return (
        <PageContentBlock title={'Dashboard'} showFlashKey={'dashboard'}>
            <WelcomeBanner>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className={'icon-wrap'}>
                        <FontAwesomeIcon icon={faUtensils} />
                    </div>
                    <div>
                        <div className={'title'}>Selamat datang, {username}!</div>
                        <div className={'subtitle'}>Kantin Panel &mdash; Kelola server lo dari sini.</div>
                    </div>
                    {rootAdmin && (
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--kp-text-muted)' }}>
                                {showOnlyAdmin ? 'Semua server' : 'Server gw'}
                            </span>
                            <Switch
                                name={'show_all_servers'}
                                defaultChecked={showOnlyAdmin}
                                onChange={() => setShowOnlyAdmin((s) => !s)}
                            />
                        </div>
                    )}
                </div>
            </WelcomeBanner>

            <SectionLabel>
                <FontAwesomeIcon icon={faServer} style={{ fontSize: '0.65rem' }} />
                Daftar Server
            </SectionLabel>

            {!servers ? (
                <Spinner size={'large'} centered />
            ) : servers.items.length === 0 ? (
                <EmptyState>
                    <div className={'icon'}>
                        <FontAwesomeIcon icon={faServer} />
                    </div>
                    <p>Belum ada server. Hubungi admin untuk request server.</p>
                </EmptyState>
            ) : (
                <Pagination data={servers} onPageSelect={setPage}>
                    {({ items }) =>
                        items.map((server, index) => (
                            <ServerRow key={server.uuid} server={server} css={index > 0 ? tw`mt-2` : undefined} />
                        ))
                    }
                </Pagination>
            )}
        </PageContentBlock>
    );
};
