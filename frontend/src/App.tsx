import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {ListCreator} from "./components/listCreator/ListCreator";
import {ListForm} from "./components/listForm/ListForm";
import Grid from "@material-ui/core/Grid";
import {NewListButton} from "./components/newListButton/NewListButton";
import {MuiThemeProvider} from "@material-ui/core";
import createPalette from "@material-ui/core/styles/createPalette";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
    palette: createPalette({
        type: 'light',
        background: {
            default: indigo[100],
        },
    }),
});

const App: React.FC = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Grid
                container
                justify="center"
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
        </MuiThemeProvider>
    );
};

export default App;
