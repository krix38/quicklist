import {useHistory} from "react-router";
import FiberNew from "@material-ui/icons/FiberNew";
import IconButton from "@material-ui/core/IconButton"
import React from "react";

export const NewListButton = () => {
    const history = useHistory();
    return (
        <IconButton
            color="secondary"
            aria-label="new list"
            onClick={() => history.push('/new')}
        >
            <FiberNew/>
        </IconButton>
    );
};