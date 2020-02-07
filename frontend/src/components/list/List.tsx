import * as React from 'react';
import {Item} from "../item/Item";
import {ListModel} from "../../services/api/model/ListModel";

interface ListProps {
    model: ListModel;
}

export const List = ({model}: ListProps) => (
    <>
        {model.items.map(item => (
            <div><Item item={item}/></div>
        ))}
    </>
);