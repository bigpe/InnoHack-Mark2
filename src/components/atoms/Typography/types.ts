import { ComponentPropsWithoutRef } from 'react';

import {
    IThemePalette,
    ThemeFontVariantGroupKeys,
    ThemeFontVariantSizeKeys,
} from 'theme/custom/theme';
import { NestedKeyOf } from 'types/utils';

export type TypographyProps = ComponentPropsWithoutRef<'p'> & {
    variant?: `${ThemeFontVariantGroupKeys}.${ThemeFontVariantSizeKeys}`;
    $color?: NestedKeyOf<Omit<IThemePalette, 'gradients' | 'glass' | 'grey'>>;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
};

export type TypographyColorBadgeProps = {
    $color?: NestedKeyOf<Omit<IThemePalette, 'gradients' | 'glass' | 'grey'>>;
};
