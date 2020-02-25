import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";


export const useLoaderStyles = makeStyles((theme: Theme) =>
    createStyles({
        loader: {
            marginTop: theme.spacing(2),
        }
    })
);