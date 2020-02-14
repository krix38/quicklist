
export type ItemState = "IN_CART" | "UNAVAILABLE" | "UNKNOWN";

export interface ItemModel {
    name: string;
    state: ItemState;
}