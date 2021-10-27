import React from 'react';
import clsx from 'clsx';
import {ItemModel, ItemState} from "../../services/api/model/ItemModel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {ListItem} from "@mui/material";
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
    return (
        <ListItem
            button
            onClick={() => updateItemState(index)}
            className={clsx({
                [classes.listItemInCart]: state === 'IN_CART',
                [classes.listItemUnavailable]: state === 'UNAVAILABLE'
            })}
        >
            <ListItemIcon>
                {stateIcon(state)}
            </ListItemIcon>
            <ListItemText primary={name}/>
            <ListItemSecondaryAction>
                <HighlightOffIcon
                    fontSize={"large"}
                    onClick={() => remove(index)}
                />
            </ListItemSecondaryAction>

        </ListItem>
    );
};