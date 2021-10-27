import makeStyles from '@mui/styles/makeStyles';
import { Theme } from "@mui/material";


import createStyles from '@mui/styles/createStyles';


export const useLoaderStyles = makeStyles((theme: Theme) =>
    createStyles({
        loader: {
            marginTop: theme.spacing(2),
        }
    })
);