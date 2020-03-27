import {ListModel} from "../../services/api/model/ListModel";
import {
    isListError,
    ListError,
    ListService
} from "../../services/api/service/ListService";
import {ItemState} from "../../services/api/model/ItemModel";
import {useEffect, useState} from "react";
import {EventService} from "../../services/api/service/EventService";

export type RemoveItemCallback = (index: number) => Promise<ListModel> | undefined;
export type UpdateItemStateCallback = (index: number) => Promise<ListModel> | undefined;
export type AddItemCallback = (newItem?: string) => Promise<ListModel> | undefined;
type SetListCallback = (list: ListModel) => void;
type setDisplayErrorCallback = (error: ListError) => void;
type SetIsVersionUpToDateCallback = (isVersionUpToDate: boolean) => void;

export const useListContext = (id: string) => {
    const [displayError, setDisplayError] = useState<ListError>();
    const [list, setList] = useState<ListModel>();
    const [listening, setListening] = useState(false);
    const [isVersionUpToDate, setIsVersionUpToDate] = useState(false);
    const removeItem = removeItemFromList(setIsVersionUpToDate, setDisplayError, list);
    const updateItemState = updateItemStateInList(setIsVersionUpToDate, setDisplayError, list);
    const addItem = addNewItemOnList(setIsVersionUpToDate, setDisplayError, list);

    useEffect(() => {
        if (!listening) {
            EventService.createEventSource(id);
            EventService.getEventSource(id).onmessage = () => {
                fetchList(id, setList, setDisplayError, setIsVersionUpToDate)
            };
            setListening(true);
            fetchList(id, setList, setDisplayError, setIsVersionUpToDate);
        }
    }, [id, listening, list]);

    useEffect(() => {
        if (!isVersionUpToDate) {
            fetchList(id, setList, setDisplayError, setIsVersionUpToDate);
        }
    }, [id, isVersionUpToDate]);

    return {list, removeItem, addItem, updateItemState, displayError};
};

const addNewItemOnList = (
    isVersionUpToDate: SetIsVersionUpToDateCallback,
    displayError: setDisplayErrorCallback,
    list?: ListModel
): AddItemCallback => (newItem?: string) =>
    list && newItem ? ListService.updateList(
        list.id,
        {...list, items: [...list.items, {name: newItem, state: "UNKNOWN"}]}
    ).catch(handleUpdateErrors(isVersionUpToDate, displayError)) : undefined;

const removeItemFromList = (
    isVersionUpToDate: SetIsVersionUpToDateCallback,
    displayError: setDisplayErrorCallback,
    list?: ListModel
): RemoveItemCallback => (index: number) =>
    list ? ListService.updateList(list.id, {
        ...list,
        items: list.items.filter((item, itemIndex) => itemIndex !== index)
    }).catch(handleUpdateErrors(isVersionUpToDate, displayError)) : undefined;

const stateMapping: {
    readonly [state in ItemState]: ItemState
} = {
    'UNKNOWN': 'IN_CART',
    'IN_CART': 'UNAVAILABLE',
    'UNAVAILABLE': 'UNKNOWN'
};

const updateItemStateInList = (
    isVersionUpToDate: SetIsVersionUpToDateCallback,
    displayError: setDisplayErrorCallback,
    list?: ListModel
): UpdateItemStateCallback => (index: number) =>
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
    ).catch(handleUpdateErrors(isVersionUpToDate, displayError)) : undefined;

const fetchList = (id: string, setList: SetListCallback, displayError: setDisplayErrorCallback, setIsVersionUpToDate: SetIsVersionUpToDateCallback) =>
    ListService
        .getList(id)
        .then(fetchedList => {
            setList(fetchedList);
            setIsVersionUpToDate(true);
        })
        .catch(error => {
            if (isListError(error)) {
                displayError(error);
            } else throw error
        });


const handleUpdateErrors = (isVersionUpToDate: SetIsVersionUpToDateCallback, displayError: setDisplayErrorCallback) =>
    (error: ListError) => {
        if (isListError(error)) {
            if (error.listErrorType === 'INVALID_VERSION') {
                isVersionUpToDate(false);
            } else {
                displayError(error);
            }
        }
        throw error
    };