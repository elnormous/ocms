const express = require("express")
const path = require("path")
const fs = require("fs");
const Postgres = require("./Postgres.js")

module.exports = class Server {
    server = null;
    database = null;
    config = {};

    constructor(
        databaseDriver,
        databaseHostname,
        databasePort,
        databaseName,
        databaseUsername,
        databasePassword
    ) {
        try {
            let configData = fs.readFileSync('./config.json');
            this.config = JSON.parse(configData);
        } catch (e) {
            throw new Error("Failed to load config, " + e.message);
        }

        switch (databaseDriver) {
            case "postgres":
                this.database = new Postgres(
                    databaseHostname,
                    databasePort,
                    databaseName,
                    databaseUsername,
                    databasePassword
                );
                break;
            default:
                throw new Error("Unsupported database driver");
        }

        this.server = express();

        this.server.get("/api/config", this.handleGetConfig.bind(this));

        if (this.config["tables"] !== undefined) {
            const tables = this.config["tables"];

            for (const tableName in tables) {
                const table = tables[tableName];

                this.server.get("/api/tables/" + tableName, this.handleGetTableIds.bind(this, tableName, table));
                this.server.post("/api/tables/" + tableName, this.handlePostTableRow.bind(this, tableName, table));
                this.server.get("/api/tables/" + tableName + "/:id", this.handleGetTableRow.bind(this, tableName, table));
                this.server.put("/api/tables/" + tableName + "/:id", this.handlePutTableRow.bind(this, tableName, table));
                this.server.delete("/api/tables/" + tableName + "/:id", this.handleDeleteTableRow.bind(this, tableName, table));
            }
        }

        this.server.use(express.static(path.join("dist")));
        this.server.use("*", express.static(path.join("dist", "index.html")));
    }

    async handleGetConfig(request, response) {
        console.log(request.query);

        response.status(200);
        //response.setHeader("Content-Type", "application/json");
        response.json(this.config);
    }

    async handleGetTableIds(tableName, table, request, response) {
        try {
            const ids = await this.database.getIds(tableName, table);

            response.status(200);
            response.json(ids);
        } catch (e) {
            console.error(e.name + ":", e.message);
            response.status(500);
            response.send();
        }
    }

    async handlePostTableRow(tableName, table, request, response) {
        response.status(501);
        response.send("id");
        // TODO: insert a row into database and return the inserted id
    }

    async handleGetTableRow(tableName, table, request, response) {
        let { id } = request.params;
        try {
            const rows = await this.database.getRow(tableName, table, id);

            if (rows.length > 0) {
                response.status(200);
                response.json(rows[0]);
            } else {
                response.status(404);
                response.send();
            }
        } catch (e) {
            console.error(e.name + ":", e.message);
            response.status(500);
            response.send();
        }
    }

    async handlePutTableRow(tableName, table, request, response) {
        let { id } = request.params;

        response.status(501);
        response.send();

        // TODO: update the row in database
    }

    async handleDeleteTableRow(tableName, table, request, response) {
        let { id } = request.params;

        response.status(501);
        response.send();

        // TODO: delete the row from database
    }

    run(hostname, port) {
        console.log("Running server on", hostname, "port", port);
        this.server.listen(port, hostname);
    }
}