import React, {useEffect, useState} from 'react';
import {ListModel} from "../../services/api/model/ListModel";
import {Redirect} from 'react-router-dom';
import {ListService, ListError, isListError} from "../../services/api/service/ListService";
import CircularProgress from '@mui/material/CircularProgress';
import {useLoaderStyles} from './useLoaderStyles';
import {ListErrorModal} from '../listErrorModal/ListErrorModal';

export const ListCreator = () => {

    const [createdList, setCreatedList] = useState<ListModel>();
    const [displayError, setDisplayError] = useState<ListError>();
    const classes = useLoaderStyles();

    useEffect(() => {
        if(!createdList){
            ListService.createList()
            .then(list => setCreatedList(list))
            .catch(error => {
                if(isListError(error)){
                    setDisplayError(error);
                }
            });
        }
    });

    if (displayError) {
        return (<ListErrorModal displayError={displayError}/>);
    }

    return (
        <>
            {createdList
                ? (<Redirect to={{ pathname: "/" + createdList.id }}/>)
                : (<CircularProgress className={classes.loader} color="secondary" />)
            }
        </>
    );
};