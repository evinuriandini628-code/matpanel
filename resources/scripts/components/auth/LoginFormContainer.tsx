import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled, { keyframes } from 'styled-components/macro';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
`;

const bgPulse = keyframes`
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.7; }
`;

const PageWrapper = styled.div`
    min-height: 100vh;
    background: #0a0f1e;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: '';
        position: absolute;
        top: -20%;
        left: -10%;
        width: 60%;
        height: 70%;
        background: radial-gradient(ellipse, rgba(30, 111, 217, 0.12) 0%, transparent 70%);
        animation: ${bgPulse} 4s ease-in-out infinite;
        pointer-events: none;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -20%;
        right: -10%;
        width: 50%;
        height: 60%;
        background: radial-gradient(ellipse, rgba(59, 158, 255, 0.08) 0%, transparent 70%);
        animation: ${bgPulse} 5s ease-in-out infinite reverse;
        pointer-events: none;
    }
`;

const Container = styled.div`
    position: relative;
    z-index: 10;
    width: 100%;
    padding: 1.5rem;

    ${breakpoint('sm')`
        max-width: 480px;
        margin: 0 auto;
    `};
`;

const LogoSection = styled.div`
    text-align: center;
    margin-bottom: 2rem;

    .icon-wrap {
        width: 68px;
        height: 68px;
        background: linear-gradient(135deg, #1e6fd9, #3b9eff);
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.75rem;
        color: white;
        margin: 0 auto 1rem;
        box-shadow: 0 0 30px rgba(59, 158, 255, 0.35), 0 8px 32px rgba(0, 0, 0, 0.4);
        animation: ${float} 3s ease-in-out infinite;
    }

    .panel-name {
        font-size: 1.75rem;
        font-weight: 800;
        font-family: 'Inter', system-ui, sans-serif;
        letter-spacing: -0.03em;
        background: linear-gradient(135deg, #e0f0ff 0%, #3b9eff 60%, #1e6fd9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 4px;
    }

    .panel-tagline {
        font-size: 0.78rem;
        color: rgba(176, 210, 255, 0.4);
        letter-spacing: 0.05em;
    }
`;

const GlassCard = styled.div`
    border-radius: 18px;
    background: rgba(13, 21, 38, 0.85);
    backdrop-filter: blur(20px) saturate(140%);
    -webkit-backdrop-filter: blur(20px) saturate(140%);
    border: 1px solid rgba(30, 111, 217, 0.2);
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(59, 158, 255, 0.08);
    padding: 2rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(59, 158, 255, 0.4), transparent);
    }
`;

const FooterText = styled.p`
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.7rem;
    color: rgba(176, 210, 255, 0.2);
    font-family: 'Inter', system-ui, sans-serif;

    a {
        color: rgba(59, 158, 255, 0.4);
        text-decoration: none;
    }
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => (
    <PageWrapper>
        <Container>
            <LogoSection>
                <div className={'icon-wrap'}>🍽️</div>
                <div className={'panel-name'}>Kantin Panel</div>
                <div className={'panel-tagline'}>Game Server Management</div>
            </LogoSection>

            <FlashMessageRender css={tw`mb-3`} />

            <GlassCard>
                {title && (
                    <h2 style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'rgba(176, 210, 255, 0.7)',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        letterSpacing: '0.02em',
                    }}>
                        {title}
                    </h2>
                )}
                <Form {...props} ref={ref} />
            </GlassCard>

            <FooterText>
                Kantin Panel &mdash; Powered by{' '}
                <a href={'https://pterodactyl.io'} target={'_blank'} rel={'noopener noreferrer'}>
                    Pterodactyl
                </a>
                {' '}&copy; {new Date().getFullYear()}
            </FooterText>
        </Container>
    </PageWrapper>
));
