import styled, { css } from 'styled-components/macro';
import tw from 'twin.macro';

export interface Props {
    isLight?: boolean;
    hasError?: boolean;
}

const light = css<Props>`
    /* "light" inputs now live on a dark glass card — give them a translucent
       dark surface with a violet focus ring to match the global purple theme. */
    background: rgba(20, 16, 32, 0.55);
    ${tw`border-neutral-200 text-neutral-100`};
    border-color: rgba(167, 139, 250, 0.25);
    backdrop-filter: blur(6px);

    &::placeholder {
        ${tw`text-neutral-400`};
    }

    &:hover {
        border-color: rgba(167, 139, 250, 0.45);
    }

    &:focus {
        border-color: rgba(167, 139, 250, 0.8);
        box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.18), 0 0 18px rgba(139, 92, 246, 0.25);
    }

    &:disabled {
        background: rgba(20, 16, 32, 0.35);
        border-color: rgba(167, 139, 250, 0.12);
    }
`;

const checkboxStyle = css<Props>`
    ${tw`bg-neutral-500 cursor-pointer appearance-none inline-block align-middle select-none flex-shrink-0 w-4 h-4 text-primary-400 border border-neutral-300 rounded-sm`};
    color-adjust: exact;
    background-origin: border-box;
    transition: all 75ms linear, box-shadow 25ms linear;

    &:checked {
        ${tw`border-transparent bg-no-repeat bg-center`};
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-color: currentColor;
        background-size: 100% 100%;
    }

    &:focus {
        ${tw`outline-none border-primary-300`};
        box-shadow: 0 0 0 1px rgba(9, 103, 210, 0.25);
    }
`;

const inputStyle = css<Props>`
    // Reset to normal styling.
    resize: none;
    ${tw`appearance-none outline-none w-full min-w-0`};
    ${tw`p-3 border-2 rounded text-sm transition-all duration-150`};
    ${tw`bg-neutral-600 border-neutral-500 hover:border-neutral-400 text-neutral-200 shadow-none focus:ring-0`};

    & + .input-help {
        ${tw`mt-1 text-xs`};
        ${(props) => (props.hasError ? tw`text-red-200` : tw`text-neutral-200`)};
    }

    &:required,
    &:invalid {
        ${tw`shadow-none`};
    }

    &:not(:disabled):not(:read-only):focus {
        ${tw`shadow-md border-primary-300 ring-2 ring-primary-400 ring-opacity-50`};
        ${(props) => props.hasError && tw`border-red-300 ring-red-200`};
    }

    &:disabled {
        ${tw`opacity-75`};
    }

    ${(props) => props.isLight && light};
    ${(props) => props.hasError && tw`text-red-100 border-red-400 hover:border-red-300`};
`;

const Input = styled.input<Props>`
    &:not([type='checkbox']):not([type='radio']) {
        ${inputStyle};
    }

    &[type='checkbox'],
    &[type='radio'] {
        ${checkboxStyle};

        &[type='radio'] {
            ${tw`rounded-full`};
        }
    }
`;
const Textarea = styled.textarea<Props>`
    ${inputStyle}
`;

export { Textarea };
export default Input;
