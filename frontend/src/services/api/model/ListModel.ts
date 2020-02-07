import {ItemModel} from "./ItemModel";

interface Link {
    href: string;
}

interface SelfLink {
    self: Link;
}

export interface ListModel {
    id: string;
    items: ItemModel[];
    _links: SelfLink;
}