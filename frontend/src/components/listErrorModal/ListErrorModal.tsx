import React from 'react';
import {useHistory} from 'react-router-dom';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {ListError, ListErrorType} from "../../services/api/service/ListService";
import {useModalStyles} from "./useModalStyles.hook";
import {EventService} from "../../services/api/service/EventService";

interface ListErrorProps {
    displayError: ListError;
}

const errorMessageMapping: {
    readonly [error in ListErrorType]: string
} = {
    'SERVER_ERROR': 'Server error!',
    'UNHANDLED': 'Unhandled error!',
    'LIST_NOT_FOUND': 'List not found!',
    'INVALID_VERSION': 'Invalid version!',
};

export const ListErrorModal = ( { displayError }: ListErrorProps ) => {
    const classes = useModalStyles();
    const [open, setOpen] = React.useState(true);
    const history = useHistory();
    const handleClose = () => {
        setOpen(false);
        EventService.closeAllEventSources();
        history.push('/')
    };
    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 1000,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <p>{errorMessageMapping[displayError.listErrorType]}</p>
                </div>
            </Fade>
        </Modal>
    );
};