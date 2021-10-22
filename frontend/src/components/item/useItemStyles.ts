import makeStyles from '@mui/styles/makeStyles';
import { lightGreen, red } from '@mui/material/colors';

export const useItemStyles = makeStyles({
    listItemInCart: {
        backgroundColor: lightGreen[100],
        '&:hover': {
            backgroundColor: lightGreen[200]
        }
    },
    listItemUnavailable: {
        backgroundColor: red[100],
        '&:hover': {
            backgroundColor: red[200]
        }
    },
});