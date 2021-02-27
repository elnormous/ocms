const { Client } = require('pg')

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
}