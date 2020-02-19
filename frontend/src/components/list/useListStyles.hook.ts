import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useListStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);
