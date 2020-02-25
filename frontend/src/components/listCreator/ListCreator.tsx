import React, {useEffect, useState} from 'react';
import {ListModel} from "../../services/api/model/ListModel";
import {Redirect} from 'react-router-dom';
import {ListService} from "../../services/api/service/ListService";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useLoaderStyles} from './useLoaderStyles';

export const ListCreator = () => {

    const [createdList, setCreatedList] = useState<ListModel>();
    const classes = useLoaderStyles();

    useEffect(() => {
        if(!createdList){
            ListService.createList().then(list => setCreatedList(list))
        }
    });

    return (
        <>
            {createdList
                ? (<Redirect to={{ pathname: "/" + createdList.id }}/>)
                : (<CircularProgress className={classes.loader} color="secondary" />)
            }
        </>
    );
};