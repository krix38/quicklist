import {ListModel} from "../../services/api/model/ListModel";
import {ListService} from "../../services/api/service/ListService";
import {ItemState} from "../../services/api/model/ItemModel";
import {useEffect, useState} from "react";
import {EventService} from "../../services/api/service/EventService";

export type RemoveItemCallback = (index: number) => void;
export type UpdateItemStateCallback = (index: number) => void;
export type AddItemCallback = (newItem?: string) => void;
type SetListCallback = (list: ListModel) => void;

export const useListContext = (id: string) => {
    const [list, setList] = useState<ListModel>();
    const [listening, setListening] = useState(false);
    const removeItem = removeItemFromList(list);
    const updateItemState = updateItemStateInList(list);
    const addItem = addNewItemOnList(list);
    useEffect(() => {
        if (!listening) {
            EventService.getEventStream(id).onmessage = () => {
                fetchList(id, setList)
            };
            setListening(true);
            fetchList(id, setList);
        }
    }, [listening, list]);

    return {list, removeItem, addItem, updateItemState};
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

const fetchList = (id: string, setList: SetListCallback) => ListService.getList(id).then(fetchedList => setList(fetchedList));

