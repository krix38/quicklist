import {AddItemCallback} from "./useListContext.hook";
import {useState} from "react";

type SetItemCallback = (item: string) => void;
type SetLoadingCallback = (isLoading: boolean) => void;

const addItemFromInputCallback = (setItem: SetItemCallback, addItemToList: AddItemCallback, setLoading: SetLoadingCallback) => (newItem?: string) => {
    setLoading(true);
    addItemToList(newItem)
        ?.then( () => setItem(""))
        .finally(() => setLoading(false));
};

export const useItemInputContext = (addItemToListCallback: AddItemCallback, setLoadingCallback: SetLoadingCallback) => {
    const [newItem, setItem] = useState<string>();
    const addItemFromInputToList = addItemFromInputCallback(setItem, addItemToListCallback, setLoadingCallback);
    return {newItem, setItem, addItemFromInputToList}
};
