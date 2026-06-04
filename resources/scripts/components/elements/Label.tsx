import styled from 'styled-components/macro';
import tw from 'twin.macro';

const Label = styled.label<{ isLight?: boolean }>`
    ${tw`block text-xs uppercase mb-1 sm:mb-2`};
    ${tw`text-neutral-300`};
    letter-spacing: 0.08em;
    font-weight: 600;
    /* "isLight" labels sit on the dark glass card now — keep them light + violet tinted. */
    ${(props) => props.isLight && 'color: #c4b5fd;'};
`;

export default Label;
