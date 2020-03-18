import {ListModel} from "../../services/api/model/ListModel";
import {isListFetchingError, ListError, ListService} from "../../services/api/service/ListService";
import {ItemState} from "../../services/api/model/ItemModel";
import {useEffect, useState} from "react";
import {EventService} from "../../services/api/service/EventService";

export type RemoveItemCallback = (index: number) => void;
export type UpdateItemStateCallback = (index: number) => void;
export type AddItemCallback = (newItem?: string) => void;
type SetListCallback = (list: ListModel) => void;
type SetErrorCallback = (error: ListError) => void;

export const useListContext = (id: string) => {
    const [error, setError] = useState<ListError>();
    const [list, setList] = useState<ListModel>();
    const [listening, setListening] = useState(false);
    const removeItem = removeItemFromList(list);
    const updateItemState = updateItemStateInList(list);
    const addItem = addNewItemOnList(list);
    useEffect(() => {
        if (!listening) {
            EventService.createEventSource(id);
            EventService.getEventSource(id).onmessage = () => {
                fetchList(id, setList, setError)
            };
            setListening(true);
            fetchList(id, setList, setError);
        }
    }, [id, listening, list]);

    return {list, removeItem, addItem, updateItemState, error};
};

const addNewItemOnList = (list?: ListModel): AddItemCallback => (newItem?: string) =>
    list && newItem ? ListService.updateList(
        list.id,
        {...list, items: [...list.items, {name: newItem, state: "UNKNOWN"}]}
    ) : undefined;

const removeItemFromList = (list?: ListModel): RemoveItemCallback => (index: number) =>
    list ? ListService.updateList(list.id, {
        ...list,
        items: list.items.filter((item, itemIndex) => itemIndex !== index)
    }) : undefined;

const stateMapping: {
    readonly [state in ItemState]: ItemState
} = {
    'UNKNOWN': 'IN_CART',
    'IN_CART': 'UNAVAILABLE',
    'UNAVAILABLE': 'UNKNOWN'
};

const updateItemStateInList = (list?: ListModel): UpdateItemStateCallback => (index: number) =>
    list ? ListService.updateList(
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
    ) : undefined;

const fetchList = (id: string, setList: SetListCallback, setError: SetErrorCallback) =>
    ListService
        .getList(id)
        .then(fetchedList => {
            setList(fetchedList);
        })
        .catch(error => {
            if(isListFetchingError(error)){
                setError(error);
            } else throw error
        });

