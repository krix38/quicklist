import {AddItemCallback} from "./useListContext.hook";
import {useState} from "react";

type SetItemCallback = (item: string) => void;

const addItemFromInputCallback = (setItem: SetItemCallback, addItemToList: AddItemCallback) => (newItem?: string) => {
    const addedItemToList = addItemToList(newItem);
    if (addedItemToList) {
        addedItemToList
            .then( () => setItem(""))
    }
};

export const useItemInputContext = (addItemToListCallback: AddItemCallback) => {
    const [newItem, setItem] = useState<string>();
    const addItemFromInputToList = addItemFromInputCallback(setItem, addItemToListCallback);
    return {newItem, setItem, addItemFromInputToList}
};
