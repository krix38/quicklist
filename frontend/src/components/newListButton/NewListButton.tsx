import {useHistory} from "react-router";
import FiberNew from "@mui/icons-material/FiberNew";
import IconButton from "@mui/material/IconButton"
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
            size="large">
            <FiberNew fontSize={"large"}/>
        </IconButton>
    );
};