const Database = require("./Database.js")
const { Client } = require("pg")

module.exports = class Postgres extends Database {
    client = null;

    constructor(hostname, port, name, username, password) {
        super();

        this.client = new Client({
            host: hostname,
            port: port,
            database: name,
            user: username,
            password: password,
        });

        this.client.connect();
    }

    async getRows(tableName, table) {
        let query = "SELECT " + table["primaryKey"] + " FROM " + tableName;
        const result = await this.client.query(query);

        const primaryKey = table["primaryKey"];
        const rows = result["rows"];
        let ids = [];
        for (const i in rows) {
            const row = rows[i];
            ids.push(row[primaryKey]);
        }

        return ids;
    }

    async getRow(tableName, table, id) {
        let query = "SELECT ";
        const fields = table["fields"];
        const primaryKey = table["primaryKey"];
        let fieldCount = 0;
        for (const field in fields) {
            if (field == primaryKey) continue;
            if (fieldCount++ != 0) query += ",";
            query += field;
        }

        query += " FROM " + tableName + " WHERE " + primaryKey + "=$1";

        const result = await this.client.query(query, [id]);
        return result["rows"];
    }

    async insertRow(tableName, table, values) {

    }

    async updateRow(tableName, table, id, values) {

    }

    async deleteRow(tableName, table, id) {
        const fields = table["fields"];
        const primaryKey = table["primaryKey"];

        query += "DELETE FROM " + tableName + " WHERE " + primaryKey + "=$1";

        return this.client.query(query, [id]);
    }
}