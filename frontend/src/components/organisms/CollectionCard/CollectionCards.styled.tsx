import styled from 'styled-components';

export const CardLabel = styled.div`
    background-color: ${({ theme }) => theme.palette.accent};

    border-radius: 16px;
    padding: 8px 22px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    max-width: fit-content;
`;

export const ImagesStack = styled.div`
    position: relative;
    min-width: 250px;
    max-height: 250px;
    display: flex;
    img {
        position: absolute;
        filter: drop-shadow(-2px 2px 15px rgba(113, 126, 249, 0.25));
    }
`;
