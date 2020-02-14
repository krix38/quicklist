import * as React from 'react';
import {Item} from "../item/Item";
import {ListModel} from "../../services/api/model/ListModel";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MaterialList from '@material-ui/core/List';
import {RemoveItemCallback, UpdateItemStateCallback} from "../listForm/ListForm";


interface ListProps {
    model: ListModel;
    onRemove: (list: ListModel) => RemoveItemCallback;
    onItemUpdate: (list: ListModel) => UpdateItemStateCallback;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export const List = ({model, onRemove, onItemUpdate}: ListProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MaterialList component="nav">
            {model.items.map((item, index) => (
                <div>
                    <Item
                        item={item}
                        remove={onRemove(model)}
                        updateItemState={onItemUpdate(model)}
                        index={index}
                    />
                </div>
            ))}
            </MaterialList>
        </div>
    );
}