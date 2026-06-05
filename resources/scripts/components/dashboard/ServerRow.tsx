import React, { memo, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthernet, faHdd, faMemory, faMicrochip, faServer, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Server } from '@/api/server/getServer';
import getServerResourceUsage, { ServerPowerState, ServerStats } from '@/api/server/getServerResourceUsage';
import { bytesToString, ip, mbToBytes } from '@/lib/formatters';
import tw from 'twin.macro';
import Spinner from '@/components/elements/Spinner';
import styled from 'styled-components/macro';
import isEqual from 'react-fast-compare';

const isAlarmState = (current: number, limit: number): boolean => limit > 0 && current / (limit * 1024 * 1024) >= 0.9;

const ServerCard = styled(Link)<{ $status: ServerPowerState | undefined }>`
    display: block;
    text-decoration: none;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(13, 21, 38, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%);
    border: 1px solid rgba(30, 111, 217, 0.15);
    padding: 1.25rem 1.5rem;
    position: relative;
    overflow: hidden;
    transition: all 0.25s ease;
    margin-bottom: 0.75rem;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        border-radius: 14px 0 0 14px;
        background: ${({ $status }) =>
            !$status || $status === 'offline'
                ? 'linear-gradient(180deg, #ef4444, #dc2626)'
                : $status === 'running'
                ? 'linear-gradient(180deg, #22c55e, #16a34a)'
                : 'linear-gradient(180deg, #eab308, #ca8a04)'};
        box-shadow: ${({ $status }) =>
            !$status || $status === 'offline'
                ? '0 0 10px rgba(239, 68, 68, 0.5)'
                : $status === 'running'
                ? '0 0 10px rgba(34, 197, 94, 0.5)'
                : '0 0 10px rgba(234, 179, 8, 0.5)'};
    }

    &:hover {
        border-color: rgba(59, 158, 255, 0.35);
        background: linear-gradient(135deg, rgba(15, 25, 48, 0.98) 0%, rgba(12, 18, 35, 1) 100%);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 158, 255, 0.1);
        transform: translateY(-1px);
    }
`;

const StatusDot = styled.span<{ $status: ServerPowerState | undefined }>`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    background: ${({ $status }) =>
        !$status || $status === 'offline'
            ? '#ef4444'
            : $status === 'running'
            ? '#22c55e'
            : '#eab308'};
    box-shadow: ${({ $status }) =>
        !$status || $status === 'offline'
            ? '0 0 6px rgba(239, 68, 68, 0.7)'
            : $status === 'running'
            ? '0 0 6px rgba(34, 197, 94, 0.7)'
            : '0 0 6px rgba(234, 179, 8, 0.7)'};
`;

const StatItem = styled.div<{ $alarm?: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    color: ${({ $alarm }) => ($alarm ? '#fca5a5' : 'rgba(176, 210, 255, 0.6)')};
    font-family: 'JetBrains Mono', 'Fira Code', monospace;

    svg {
        color: ${({ $alarm }) => ($alarm ? '#ef4444' : 'rgba(59, 158, 255, 0.5)')};
        width: 12px;
    }
`;

type Timer = ReturnType<typeof setInterval>;

export default ({ server, className }: { server: Server; className?: string }) => {
    const interval = useRef<Timer>(null) as React.MutableRefObject<Timer>;
    const [isSuspended, setIsSuspended] = useState(server.status === 'suspended');
    const [stats, setStats] = useState<ServerStats | null>(null);

    const getStats = () =>
        getServerResourceUsage(server.uuid)
            .then((data) => setStats(data))
            .catch((error) => console.error(error));

    useEffect(() => {
        setIsSuspended(stats?.isSuspended || server.status === 'suspended');
    }, [stats?.isSuspended, server.status]);

    useEffect(() => {
        if (isSuspended) return;
        getStats().then(() => {
            interval.current = setInterval(() => getStats(), 30000);
        });
        return () => {
            interval.current && clearInterval(interval.current);
        };
    }, [isSuspended]);

    const cpuUsed = stats?.cpuAbsolute ?? 0;
    const ramUsed = stats ? stats.memoryUsageInBytes / 1024 / 1024 : 0;
    const diskUsed = stats ? stats.diskUsageInBytes / 1024 / 1024 : 0;
    const isRamAlarm = isAlarmState(stats?.memoryUsageInBytes ?? 0, server.limits.memory);
    const isDiskAlarm = isAlarmState(stats?.diskUsageInBytes ?? 0, server.limits.disk);

    const powerState: ServerPowerState | undefined = stats?.currentState;

    return (
        <ServerCard to={`/server/${server.id}`} className={className} $status={isSuspended ? 'offline' : powerState}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        <StatusDot $status={isSuspended ? 'offline' : powerState} />
                        <span style={{
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            color: '#e0f0ff',
                            fontFamily: 'Inter, system-ui, sans-serif',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}>
                            {server.name}
                        </span>
                    </div>
                    {server.description && (
                        <p style={{
                            fontSize: '0.75rem',
                            color: 'rgba(176, 210, 255, 0.4)',
                            margin: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}>
                            {server.description}
                        </p>
                    )}
                </div>
                <div style={{
                    fontSize: '0.7rem',
                    color: 'rgba(176, 210, 255, 0.4)',
                    fontFamily: 'JetBrains Mono, monospace',
                    flexShrink: 0,
                    marginLeft: '1rem',
                    paddingTop: '2px',
                }}>
                    {ip(server.allocations.filter(a => a.isDefault).map(a => a.alias || a.ip)[0] || '')}
                    {server.allocations.filter(a => a.isDefault)[0]?.port && `:${server.allocations.filter(a => a.isDefault)[0].port}`}
                </div>
            </div>

            {/* Stats row */}
            {isSuspended ? (
                <div style={{ fontSize: '0.75rem', color: 'rgba(239, 68, 68, 0.7)', fontWeight: 600 }}>
                    Server Suspended
                </div>
            ) : !stats ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '24px' }}>
                    <Spinner size={'tiny'} />
                    <span style={{ fontSize: '0.72rem', color: 'rgba(176, 210, 255, 0.3)' }}>Loading stats...</span>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <StatItem $alarm={cpuUsed > 90}>
                        <FontAwesomeIcon icon={faMicrochip} />
                        <span>{cpuUsed.toFixed(1)}%</span>
                        <span style={{ color: 'rgba(176, 210, 255, 0.25)' }}>CPU</span>
                    </StatItem>
                    <StatItem $alarm={isRamAlarm}>
                        <FontAwesomeIcon icon={faMemory} />
                        <span>{bytesToString(stats.memoryUsageInBytes)}</span>
                        {server.limits.memory > 0 && (
                            <span style={{ color: 'rgba(176, 210, 255, 0.25)' }}>/ {bytesToString(mbToBytes(server.limits.memory))}</span>
                        )}
                        <span style={{ color: 'rgba(176, 210, 255, 0.25)' }}>RAM</span>
                    </StatItem>
                    <StatItem $alarm={isDiskAlarm}>
                        <FontAwesomeIcon icon={faHdd} />
                        <span>{bytesToString(stats.diskUsageInBytes)}</span>
                        {server.limits.disk > 0 && (
                            <span style={{ color: 'rgba(176, 210, 255, 0.25)' }}>/ {bytesToString(mbToBytes(server.limits.disk))}</span>
                        )}
                        <span style={{ color: 'rgba(176, 210, 255, 0.25)' }}>Disk</span>
                    </StatItem>
                    {server.allocations.filter(a => a.isDefault)[0] && (
                        <StatItem>
                            <FontAwesomeIcon icon={faEthernet} />
                            <span>{server.allocations.filter(a => a.isDefault)[0]?.port}</span>
                        </StatItem>
                    )}
                </div>
            )}
        </ServerCard>
    );
};
