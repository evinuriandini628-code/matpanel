import styled from 'styled-components/macro';
import tw from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`flex rounded-xl no-underline items-center p-4 border transition-all duration-200 overflow-hidden`};
    background: linear-gradient(135deg, rgba(13, 21, 38, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%);
    border-color: rgba(30, 111, 217, 0.15);
    color: #e0f0ff;

    ${(props) => props.$hoverable !== false && `
        &:hover {
            border-color: rgba(59, 158, 255, 0.35);
            background: linear-gradient(135deg, rgba(15, 25, 48, 0.98) 0%, rgba(12, 18, 35, 1) 100%);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }
    `};

    & .icon {
        ${tw`rounded-full w-16 flex items-center justify-center p-3`};
        background: rgba(30, 111, 217, 0.15);
        color: rgba(59, 158, 255, 0.7);
    }
`;
