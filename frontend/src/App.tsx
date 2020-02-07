import React from 'react';
import './App.css';
import {List} from "./components/list/List";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {ListCreator} from "./components/listCreator/ListCreator";
import {ListForm} from "./components/listForm/ListForm";

type TParams =  { id: string };

const App: React.FC = () => {
    return (
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
    );
};

export default App;
