import React from 'react';
import clsx from 'clsx';
import {ItemModel, ItemState} from "../../services/api/model/ItemModel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {ListItem} from "@material-ui/core";
import HelpIcon from '@material-ui/icons/Help';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
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