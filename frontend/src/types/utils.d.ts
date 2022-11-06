/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef, JSXElementConstructor } from 'react';

import {
    AnyStyledComponent,
    StyledComponentInnerComponent,
    StyledComponentInnerOtherProps,
} from 'styled-components';

export type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType &
        (string | number)]: ObjectType[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`;
}[keyof ObjectType & (string | number)];

export type InferComponentProps<T> = T extends AnyStyledComponent
    ? ComponentPropsWithoutRef<StyledComponentInnerComponent<T>> &
          StyledComponentInnerOtherProps<T>
    : T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
    ? ComponentPropsWithoutRef<T>
    : never;

export type Mutable<Type> = {
    -readonly [Key in keyof Type]: Type[Key];
};

export type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
