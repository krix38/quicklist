import React from 'react';
import {ListModel} from "../../services/api/model/ListModel";
import {Item} from "../item/Item";

interface ListProps {
    list: ListModel;
}

export const List = ({list: {items}}: ListProps) => (
    <>
        {items.map(item => (
            <Item item={item}/>
        ))}
    </>
);
