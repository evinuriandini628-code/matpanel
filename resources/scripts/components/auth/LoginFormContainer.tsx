import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

const Container = styled.div`
    ${breakpoint('sm')`
        ${tw`w-4/5 mx-auto`}
    `};

    ${breakpoint('md')`
        ${tw`p-10`}
    `};

    ${breakpoint('lg')`
        ${tw`w-3/5`}
    `};

    ${breakpoint('xl')`
        ${tw`w-full`}
        max-width: 700px;
    `};
`;

// Glassmorphism card with an animated gradient border glow.
const GlassCard = styled.div`
    position: relative;
    border-radius: 1.25rem;
    background: rgba(30, 27, 46, 0.55);
    backdrop-filter: blur(22px) saturate(160%);
    -webkit-backdrop-filter: blur(22px) saturate(160%);
    border: 1px solid rgba(167, 139, 250, 0.22);
    box-shadow: 0 20px 60px rgba(76, 29, 149, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 1.25rem;
        padding: 1px;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.7), rgba(236, 72, 153, 0.5), rgba(99, 102, 241, 0.7));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0.6;
        pointer-events: none;
    }

    &::after {
        content: '';
        position: absolute;
        top: -60%;
        left: -30%;
        width: 80%;
        height: 220%;
        background: linear-gradient(115deg, transparent, rgba(167, 139, 250, 0.08), transparent);
        transform: rotate(8deg);
        pointer-events: none;
    }
`;

const LogoWrap = styled.div`
    position: relative;
    img {
        filter: drop-shadow(0 6px 20px rgba(139, 92, 246, 0.45));
    }
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => (
    <Container>
        {title && (
            <h2
                css={tw`text-3xl text-center text-neutral-100 font-medium py-4`}
                style={{
                    background: 'linear-gradient(135deg, #c4b5fd 0%, #f0abfc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                {title}
            </h2>
        )}
        <FlashMessageRender css={tw`mb-2 px-1`} />
        <Form {...props} ref={ref}>
            <GlassCard css={tw`md:flex w-full p-6 md:pl-0 mx-1`}>
                <LogoWrap css={tw`flex-none select-none mb-6 md:mb-0 self-center relative z-10`}>
                    <img src={'/assets/svgs/pterodactyl.svg'} css={tw`block w-48 md:w-64 mx-auto`} />
                </LogoWrap>
                <div css={tw`flex-1 relative z-10`}>{props.children}</div>
            </GlassCard>
        </Form>
        <p css={tw`text-center text-neutral-400 text-xs mt-4`}>
            &copy; 2015 - {new Date().getFullYear()}&nbsp;
            <a
                rel={'noopener nofollow noreferrer'}
                href={'https://pterodactyl.io'}
                target={'_blank'}
                css={tw`no-underline text-neutral-400 hover:text-neutral-200`}
            >
                Pterodactyl Software
            </a>
        </p>
    </Container>
));
