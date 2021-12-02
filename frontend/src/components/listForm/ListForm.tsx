import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {List} from "../list/List";
import TextField from '@mui/material/TextField';
import {useListContext} from "./useListContext.hook";
import {useItemInputContext} from "./useItemInputContext.hook";
import {ListErrorModal} from "../listErrorModal/ListErrorModal";
import { CircularProgress } from '@mui/material';

export const ListForm = () => {
    const [isLoading, setLoading] = useState(false);
    const {id} = useParams<{ id: string }>();
    const {list, removeItem, addItem, updateItemState, displayError} = useListContext(id);
    const {newItem, setItem, addItemFromInputToList} = useItemInputContext(addItem, setLoading);
    if (displayError) {
        return (<ListErrorModal displayError={displayError}/>);
    }
    if (!list) {
        return null;
    }
    return (
        <>
            <TextField
                label="Add item"
                onChange={event => setItem(event.target.value)}
                value={newItem}
                variant="standard"
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        addItemFromInputToList(newItem);
                    }
                }}/>
            <List model={list} onRemove={removeItem} onItemUpdate={updateItemState}/>
            {isLoading && <CircularProgress color="secondary"/>}
        </>
    )
};
