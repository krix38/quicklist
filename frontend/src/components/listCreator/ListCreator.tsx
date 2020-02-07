import React, {useEffect, useState} from 'react';
import {ListModel} from "../../services/api/model/ListModel";
import {Redirect} from 'react-router-dom';
import {ListService} from "../../services/api/service/ListService";


export const ListCreator = () => {

    const [createdList, setCreatedList] = useState<ListModel>();

    useEffect(() => {
        if(!createdList){
            ListService.createList().then(list => setCreatedList(list))
        }
    });

    return (
        <>
            {createdList
                ? (<Redirect to={{ pathname: "/" + createdList.id }}/>)
                : (<>creating list...</>)
            }
        </>
    );
};