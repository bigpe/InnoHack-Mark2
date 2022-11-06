import { css, DefaultTheme } from 'styled-components';

export const themeTypography: DefaultTheme['typography'] = {
    body: {
        large: css`
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 0.5px;
            line-height: 24px;
        `,
        medium: css`
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 0.25px;
            line-height: 20px;
        `,
        small: css`
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0.4px;
            line-height: 16px;
        `,
    },
    display: {
        large: css`
            font-size: 57px;
            font-weight: 400;
            letter-spacing: -0.25px;
            line-height: 64px;
        `,
        medium: css`
            font-size: 45px;
            font-weight: 400;
            line-height: 52px;
        `,
        small: css`
            font-size: 36px;
            font-weight: 400;
            line-height: 44px;
        `,
    },
    headline: {
        large: css`
            font-size: 32px;
            font-weight: bold;
            line-height: 40px;
        `,
        medium: css`
            font-size: 28px;
            font-weight: bold;
            line-height: 36px;
        `,
        small: css`
            font-size: 24px;
            font-weight: bold;
            line-height: 32px;
        `,
    },
    label: {
        large: css`
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 0.1px;
            line-height: 20px;
        `,
        medium: css`
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 0.5px;
            line-height: 16px;
        `,
        small: css`
            font-size: 11px;
            font-weight: bold;
            letter-spacing: 0.5px;
            line-height: 16px;
        `,
    },
    title: {
        large: css`
            font-size: 22px;
            font-weight: bold;
            line-height: 28px;
        `,
        medium: css`
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 0.1px;
            line-height: 24px;
        `,
        small: css`
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 0.1px;
            line-height: 20px;
        `,
    },
    caption: {
        large: css`
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0.4px;
            line-height: 16px;
        `,
        medium: css`
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0.4px;
            line-height: 16px;
        `,
        small: css`
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0.4px;
            line-height: 16px;
        `,
    },
    fontFamily: 'SF Pro Display, Helvetica, sans-serif',
};
