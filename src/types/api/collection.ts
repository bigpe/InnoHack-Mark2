export interface Collection {
    uuid: string;
    readonly id: number;
    title: string;
    /**
     * @deprecated do not use
     */
    route?: string;
    route_uuid?: string;
    path: string;
    is_published: boolean;
    is_fundamental: boolean;
    is_static: boolean;
    readonly href: string;
    file?: string;
    icon?: string;
    label?: 'red' | 'green' | 'purple' | 'yellow' | 'blue';
}
