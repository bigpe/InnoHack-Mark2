export interface CollectionType {
    id: number;
    snapshot_count: string;
    marked_snapshot_count: string;
    name: string;
    color: string;
}

export interface CollectionItemList {
    id: number;
    snapshot_count?: string;
    marked_snapshot_count?: string;
    name?: string;
    type?: string;
    generate_rules?: object;
    create_rules?: object;
    markup?: string;
    color?: string;
    created_date?: Date;
    owner?: number;
    type_collection?: number;
}
