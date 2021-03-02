import React from "react";
import { Admin, Resource, List, Datagrid, TextField, EmailField } from 'react-admin';
import { createBrowserHistory as createHistory } from 'history';
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
    const history = createHistory();
    const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
    //const dataProvider = jsonServerProvider('/api');

    return <Admin history={history} dataProvider={dataProvider}>
            <Resource name="users" list={UserList} />
        </Admin>;
}
