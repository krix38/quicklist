import React from 'react';
import {ItemModel, ItemState} from "../../services/api/model/ItemModel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {ListItem} from "@material-ui/core";
import HelpIcon from '@material-ui/icons/Help';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {RemoveItemCallback, UpdateItemStateCallback} from "../listForm/ListForm";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";


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

export const Item = ({index, item: {name, state}, remove, updateItemState}: ItemProps) => (
    <ListItem button onClick={() => updateItemState(index)}>
        <ListItemIcon>
            {stateIcon(state)}
        </ListItemIcon>
        <ListItemText primary={name}/>
        <ListItemSecondaryAction>
            <HighlightOffIcon
                onClick={() => remove(index)}
            />
        </ListItemSecondaryAction>

    </ListItem>
);