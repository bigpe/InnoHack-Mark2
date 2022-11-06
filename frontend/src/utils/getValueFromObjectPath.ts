// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValueFromObjectPath = (obj: any, path: string): string =>
    path.split('.').reduce((o, key) => (o && o[key] ? o[key] : null), obj);
