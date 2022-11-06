import styled from 'styled-components';

import { getValueFromObjectPath } from 'utils/getValueFromObjectPath';

import { TypographyColorBadgeProps, TypographyProps } from './types';

export const StyledTypography = styled.p<TypographyProps>`
    ${({ theme, variant = 'body.medium' }) =>
        getValueFromObjectPath(theme.typography, variant)};

    color: ${({ theme, $color }) =>
        $color ? getValueFromObjectPath(theme.palette, $color) : undefined};

    text-align: ${({ textAlign }) => textAlign ?? undefined};

    &[data-variant*='label'] {
        display: block;
    }

    white-space: pre-line;
`;

export const TypographyBadge = styled.div<TypographyColorBadgeProps>`
    background: ${({ theme, $color }) =>
        $color ? getValueFromObjectPath(theme.palette, $color) : undefined};
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;

StyledTypography.defaultProps = {
    variant: 'body.medium',
};
