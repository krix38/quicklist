import React, {useEffect, useState} from 'react';
import {ListModel} from "../../services/api/model/ListModel";
import {useParams, useHistory} from 'react-router-dom';
import {ListService} from "../../services/api/service/ListService";
import {List} from "../list/List";
import {EventService} from "../../services/api/service/EventService";
import TextField from '@material-ui/core/TextField';
import {ItemState} from "../../services/api/model/ItemModel";
import FiberNew from "@material-ui/icons/FiberNew";
import IconButton from "@material-ui/core/IconButton";

type SetListCallback = (list: ListModel) => void;
type SetItemCallback = (item: string) => void;
export type RemoveItemCallback = (index: number) => void;
export type UpdateItemStateCallback = (index: number) => void;


const addItemToList = (list: ListModel, newItem?: string) =>
    newItem && ListService.updateList(
    list.id,
    {...list, items: [...list.items, {name: newItem, state: "UNKNOWN"}]}
    );

function fetchList(id: string, setList: SetListCallback) {
    ListService.getList(id).then(fetchedList => setList(fetchedList));
}

const addListItem = (setItem: SetItemCallback) => (list: ListModel, newItem?: string) => {
    addItemToList(list, newItem);
    setItem("");
};

const removeItem = (list: ListModel): RemoveItemCallback => (index: number) =>
    ListService.updateList(
        list.id,
        {...list, items: list.items.filter((item, itemIndex) => itemIndex !== index)}
    );

const stateMapping: {
    readonly [state in ItemState]: ItemState
} = {
    'UNKNOWN': 'IN_CART',
    'IN_CART': 'UNAVAILABLE',
    'UNAVAILABLE': 'UNKNOWN'
};

const updateItemState = (list: ListModel): UpdateItemStateCallback => (index: number) =>
    ListService.updateList(
        list.id,
        {
            ...list, items: list.items
                .map((item, itemIndex) =>
                    itemIndex === index
                        ? {
                            ...item,
                            state: stateMapping[item.state]
                        }
                        : item
                )
        }
    );


export const ListForm = () => {
    const [list, setList] = useState<ListModel>();
    const [newItem, setItem] = useState<string>();
    const [listening, setListening] = useState(false);
    const {id} = useParams<{ id: string }>();
    const history = useHistory();
    useEffect(() => {
        if (!listening) {
            EventService.getEventStream(id).onmessage = () => {
                fetchList(id, setList)
            };
            setListening(true);
            fetchList(id, setList);
        }
    }, [listening, list]);
    if (!list) {
        return null
    }
    return (
        <>
            <IconButton
                color="secondary"
                aria-label="new list"
                onClick={() => history.push('/')}
            >
                <FiberNew />
            </IconButton>
            <TextField
                label="Add item"
                onChange={event => setItem(event.target.value)}
                value={newItem}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        addListItem(setItem)(list, newItem);
                    }
                }}/>
            <List model={list} onRemove={removeItem} onItemUpdate={updateItemState}/>
        </>
    )
};
