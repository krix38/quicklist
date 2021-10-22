import * as React from 'react';
import {Item} from "../item/Item";
import {ListModel} from "../../services/api/model/ListModel";
import MaterialList from '@mui/material/List';
import {RemoveItemCallback, UpdateItemStateCallback} from "../listForm/useListContext.hook";
import {useListStyles} from "./useListStyles.hook";


interface ListProps {
    model: ListModel;
    onRemove: RemoveItemCallback;
    onItemUpdate: UpdateItemStateCallback;
}

export const List = ({model, onRemove, onItemUpdate}: ListProps) => {
    const classes = useListStyles();
    return (
        <div className={classes.root}>
            <MaterialList component="nav">
            {model.items.map((item, index) => (
                <div>
                    <Item
                        item={item}
                        remove={onRemove}
                        updateItemState={onItemUpdate}
                        index={index}
                    />
                </div>
            ))}
            </MaterialList>
        </div>
    );
}