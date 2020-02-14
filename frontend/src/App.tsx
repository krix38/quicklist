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

type TParams = { id: string };

const App: React.FC = () => {
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
        >
            <Router>
                <Switch>
                    <Route exact path="/">
                        <ListCreator/>
                    </Route>
                    <Route path="/:id">
                        <ListForm/>
                    </Route>
                </Switch>
            </Router>
        </Grid>
    );
};

export default App;
