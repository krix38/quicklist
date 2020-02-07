import React, {useEffect, useState} from 'react';
import {ListModel} from "../../services/api/model/ListModel";
import {useParams} from 'react-router-dom';
import {ListService} from "../../services/api/service/ListService";
import {List} from "../list/List";
import {EventService} from "../../services/api/service/EventService";

const addItemToList = (list: ListModel, newItem?: string) =>
    newItem && ListService.updateList(
    list.id,
    {...list, items: [...list.items, {name: newItem, state: "UNKNOWN"}]}
    );

function fetchList(id: string, setList: (list: ListModel) => void) {
    ListService.getList(id).then(fetchedList => setList(fetchedList));
}

export const ListForm = () => {
    const [list, setList] = useState<ListModel>();
    const [newItem, setNewItem] = useState<string>();
    const [listening, setListening] = useState(false);
    const {id} = useParams<{ id: string }>();
    useEffect(() => {
        if (!listening) {
            EventService.getEventStream(id).onmessage = () => {
                fetchList(id, setList)
            };
            setListening(true);
            fetchList(id, setList);
        }
    }, [listening, list]);
    return list
        ?
        <>
            <List model={list}/>
            <input onChange={event => setNewItem(event.target.value)} value={newItem}/>
            <button onClick={() => {
                addItemToList(list, newItem);
                setNewItem("");
            }}>
                add item
            </button>
        </>
        :
        <></>
};
