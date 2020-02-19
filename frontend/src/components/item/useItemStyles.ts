import makeStyles from "@material-ui/core/styles/makeStyles";
import lightGreen from "@material-ui/core/colors/lightGreen";
import red from "@material-ui/core/colors/red";

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