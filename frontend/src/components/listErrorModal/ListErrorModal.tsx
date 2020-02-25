import React from 'react';
import {useHistory} from 'react-router-dom';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {ListError, ListErrorType} from "../../services/api/service/ListService";
import {useModalStyles} from "./useModalStyles.hook";
import {EventService} from "../../services/api/service/EventService";

interface ListErrorProps {
    error: ListError;
}

const errorMessageMapping: {
    readonly [error in ListErrorType]: string
} = {
    'SERVER_ERROR': 'Server error!',
    'UNHANDLED': 'Unhandled error!',
    'LIST_NOT_FOUND': 'List not found!'
};

export const ListErrorModal = ( { error }: ListErrorProps ) => {
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
                    <p>{errorMessageMapping[error.listErrorType]}</p>
                </div>
            </Fade>
        </Modal>
    );
};