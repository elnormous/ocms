const { Client } = require("pg")

module.exports = class Database {
    client = null;

    constructor(hostname, port, name, username, password) {
        this.client = new Client({
            host: hostname,
            port: port,
            database: name,
            user: username,
            password: password,
        });

        this.client.connect();
    }

    getRows(tableName, table) {
        let query = "SELECT ";
        const fields = table["fields"];
        let fieldCount = 0;
        for (const field in fields)
        {
            if (fieldCount++ != 0) query += ",";
            query += field;
        }

        query += " FROM " + tableName;

        return this.client.query(query);
    }

    getRow(tableName, table, id) {
        let query = "SELECT ";
        const fields = table["fields"];
        let fieldCount = 0;
        for (const field in fields)
        {
            if (fieldCount++ != 0) query += ",";
            query += field;
        }

        const primaryKey = table["primaryKey"];
        const primaryKeyField = fields[primaryKey];

        query += " FROM " + tableName + " WHERE " + table["primaryKey"] + "=$1";

        return this.client.query(query, [id]);
    }

    insertRow(tableName, table, values) {

    }

    updateRow(tableName, table, id, values) {

    }

    deleteRow(tableName, table, id) {
        const fields = table["fields"];
        const primaryKey = table["primaryKey"];
        const primaryKeyField = fields[primaryKey];

        query += "DELETE FROM " + tableName + " WHERE " + table["primaryKey"] + "=$1";

        return this.client.query(query, [id]);
    }
}