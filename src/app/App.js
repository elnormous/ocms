import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { Admin, Resource, List, Datagrid, TextField, EmailField } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import "./App.scss"

const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);

export function App() {
    const [state, setState] = useState("Load");

    const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
    //const dataProvider = jsonServerProvider('/api');

    return <div className="App">
        <Admin dataProvider={dataProvider}>
            <Resource name="users" list={UserList} />
            <Resource name="bricks" list={UserList} />
        </Admin>

        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/tables">Tables</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/tables">
                        <Tables />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>

        <button onClick={() => setState("Loading")}>{state}</button>
    </div>;
}

function Home() {
    return <h2>Home</h2>;
}

function Tables() {
    return <h2>Tables</h2>;
}