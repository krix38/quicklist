import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {ListCreator} from "./components/listCreator/ListCreator";
import {ListForm} from "./components/listForm/ListForm";
import Grid from "@mui/material/Grid";
import {NewListButton} from "./components/newListButton/NewListButton";
import { ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { indigo } from '@mui/material/colors';

const theme = createTheme(adaptV4Theme({
    // palette: createPalette({
    //     type: 'light',
    //     background: {
    //         default: indigo[100],
    //     },
    // }),
}));

const App: React.FC = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                >
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <NewListButton/>
                            </Route>
                            <Route path="/new">
                                <ListCreator/>
                            </Route>
                            <Route path="/:id">
                                <NewListButton/>
                                <ListForm/>
                            </Route>
                        </Switch>
                    </Router>
                </Grid>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
