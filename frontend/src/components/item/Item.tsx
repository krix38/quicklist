import React from 'react';
import {ItemModel} from "../../services/api/model/ItemModel";

interface ItemProps {
    item: ItemModel;
}

export const Item = ({item: {name, state}}: ItemProps) => (
    <>
        name: { name }
        state: { state }
    </>
);