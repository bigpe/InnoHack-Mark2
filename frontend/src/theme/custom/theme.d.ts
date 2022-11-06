import { FlattenSimpleInterpolation } from 'styled-components';

// * theme palette declaration * //
export interface IThemePalette {
    common: {
        black: string;
        white: string;
        grey: string;
    };
    accent: string;
    green: {
        alpha: string;
        betta: string;
        gamma: string;
    };
    red: string;
    yellow: string;
    grey: {
        bg1: string;
        bg2: string;
        inactive: string;
    };
    gradients: {
        red: string;
        yellow: string;
        green: string;
        grey: string;
    };
    glass: {
        green: string;
        white: string;
    };
}

// * theme effects declaration * //
// interface IThemeEffects {
//     blur: FlattenSimpleInterpolation;
// }

// * theme font variants declaration * //
export type ThemeFontVariantSizeKeys = 'large' | 'medium' | 'small';

export type ThemeFontVariantGroupKeys =
    | 'display'
    | 'headline'
    | 'title'
    | 'label'
    | 'body'
    | 'caption';

type ThemeFontVariants = {
    [G in ThemeFontVariantGroupKeys]: {
        [K in ThemeFontVariantSizeKeys]: FlattenSimpleInterpolation;
    };
};

// * theme border radius declaration * //

interface IThemeBorderRadius {
    buttons: string;
    extraLarge: string;
    large: string;
    medium: string;
}
interface IThemeSpacers {
    medium: string;
    small: string;
    extraSmall: string;
}

// * custom theme declaration * //
export interface ICustomTheme {
    palette: IThemePalette;
    // effects: IThemeEffects;
    typography: ThemeFontVariants & {
        fontFamily: string;
    };
    borderRadius: IThemeBorderRadius;
}
