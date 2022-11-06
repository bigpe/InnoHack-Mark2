import styled from 'styled-components';

export const AuthFormWrapper = styled.form`
    max-width: 392px;
    width: 100%;
    margin: 64px 0;
    background-color: ${({ theme }) => theme.palette.common.white};
    border-radius: ${({ theme }) => theme.borderRadius.large};

    position: relative;
`;
