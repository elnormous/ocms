import React from "react";
import { Admin, Resource, List, Datagrid, TextField, EmailField, UrlField, ReferenceField, EditButton, Edit, Create, SimpleForm, ReferenceInput, SelectInput, TextInput } from 'react-admin';
import { createBrowserHistory as createHistory } from 'history';
import jsonDataProvider from './JsonDataProvider.js';
import "./App.scss"

const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <UrlField source="website" />
            <TextField source="company.name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
        <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="address.street" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="company.name" />
        </SimpleForm>
    </Create>
);

const UserTitle = record => (
    <span>User {record ? `"${record.name}"` : ''}</span>
);

export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="address.street" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="company.name" />
        </SimpleForm>
    </Edit>
);

export const PostList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
            <EditButton />
        </Datagrid>
    </List>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);

const PostTitle = record => (
    <span>Post {record ? `"${record.title}"` : ''}</span>
);

export const PostEdit = props => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput source="body" />
        </SimpleForm>
    </Edit>
);

export const App = () => (
    <Admin history={createHistory()} dataProvider={jsonDataProvider}>
        <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
    </Admin>
)
