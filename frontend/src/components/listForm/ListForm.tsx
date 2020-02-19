import React from 'react';
import {useParams} from 'react-router-dom';
import {List} from "../list/List";
import TextField from '@material-ui/core/TextField';
import {useListContext} from "./useListContext.hook";
import {useItemInputContext} from "./useItemInputContext.hook";

export const ListForm = () => {
    const {id} = useParams<{ id: string }>();
    const {list, removeItem, addItem, updateItemState} = useListContext(id);
    const {newItem, setItem, addItemFromInputToList} = useItemInputContext(addItem);
    if (!list) {
        return null
    }
    return (
        <>
            <TextField
                label="Add item"
                onChange={event => setItem(event.target.value)}
                value={newItem}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        addItemFromInputToList(newItem);
                    }
                }}/>
            <List model={list} onRemove={removeItem} onItemUpdate={updateItemState}/>
        </>
    )
};
