import {useHistory} from "react-router";
import FiberNew from "@material-ui/icons/FiberNew";
import IconButton from "@material-ui/core/IconButton"
import React from "react";
import {EventService} from "../../services/api/service/EventService";

export const NewListButton = () => {
    const history = useHistory();
    return (
        <IconButton
            color="secondary"
            aria-label="new list"
            onClick={() => {
                EventService.closeAllEventSources();
                history.push('/new');
            }}
        >
            <FiberNew fontSize={"large"}/>
        </IconButton>
    );
};