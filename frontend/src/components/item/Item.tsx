import React, {useState} from "react";
import clsx from 'clsx';
import {ItemModel, ItemState} from "../../services/api/model/ItemModel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {CircularProgress, ListItem} from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import {RemoveItemCallback, UpdateItemStateCallback} from "../listForm/useListContext.hook";
import {useItemStyles} from "./useItemStyles";

interface ItemProps {
    index: number
    item: ItemModel;
    remove: RemoveItemCallback;
    updateItemState: UpdateItemStateCallback;
}

const stateIcon = (state: ItemState) => ({
    'UNKNOWN': <HelpIcon/>,
    'IN_CART': <CheckCircleIcon/>,
    'UNAVAILABLE': <ErrorIcon/>
}[state]);

export const Item = ({index, item: {name, state}, remove, updateItemState}: ItemProps) => {
    const classes = useItemStyles();
    const [isLoading, setLoading] = useState(false);
    const [itemState, setItemState] = useState(state);
    return (
        <ListItem
            button
            onClick={() => {
                setLoading(true);
                updateItemState(index)
                ?.then((result) => setItemState(result.items[index].state))
                .finally(() => setLoading(false));
            }}
            className={clsx({
                [classes.listItemInCart]: itemState === 'IN_CART',
                [classes.listItemUnavailable]: itemState === 'UNAVAILABLE'
            })}
        >
            <ListItemIcon>
            { 
                isLoading 
                    ? <CircularProgress size={25} color="secondary"/> 
                    : stateIcon(itemState)
            }
            </ListItemIcon>
            <ListItemText primary={name}/>
            <ListItemSecondaryAction>
                <HighlightOffIcon
                    fontSize={"large"}
                    onClick={() => {
                        setLoading(true);
                        remove(index)?.finally(() => setLoading(false));
                    }}
                />
            </ListItemSecondaryAction>

        </ListItem>
    );
};