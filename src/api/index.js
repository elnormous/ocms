const express = require("express")
const path = require("path")
const fs = require("fs");
const Database = require("./Database.js")

const hostname = process.env.OCMS_HOSTNAME || "localhost";
const port = (process.env.OCMS_PORT !== undefined) ? parseInt(process.env.OCMS_PORT) : 8080;

const databaseHostname = process.env.OCMS_DATABASE_HOSTNAME || "localhost";
const databasePort = (process.env.OCMS_DATABASE_PORT !== undefined) ? parseInt(process.env.OCMS_DATABASE_PORT) : 5432;
const databaseName = process.env.OCMS_DATABASE_NAME || "ocms";
const databaseUsername = process.env.OCMS_DATABASE_USERNAME || "";
const databasePassword = process.env.OCMS_DATABASE_PASSWORD || "";

let config = {};

try {
    let configData = fs.readFileSync('./config.json');
    config = JSON.parse(configData);
}
catch (err) {
    console.error('Failed to load config, error:', err)
}

console.log("Running server on", hostname, "port", port);

const database = new Database(
    databaseHostname,
    databasePort,
    databaseName,
    databaseUsername,
    databasePassword);

const server = express()

server.get("/api/config", function (request, response) {
    console.log(request.query);

    response.status(200);
    //response.setHeader("Content-Type", "application/json");
    response.json(config);
});

if (config["tables"] !== undefined) {
    const tables = config["tables"];

    for (const tableName in tables) {
        const table = tables[tableName];

        server.get("/api/tables/" + tableName, async function (request, response) {
            try {
                const result = await database.getRows(tableName, table);
                const rows = result["rows"];

                response.status(200);
                response.json(rows);
            }
            catch (e) {
                console.error(e);
                response.status(500);
                response.send();
            }
        });

        server.get("/api/tables/" + tableName, async function (request, response) {
            response.status(501);
            response.send("id");
            // TODO: insert a row into database and return the inserted id
        });

        server.get("/api/tables/" + tableName + "/:id", async function (request, response) {
            let {id} = request.params;
            try {
                const result = await database.getRow(tableName, table, id);

                if (result["rows"].length > 0) {
                    const rows = result["rows"];

                    response.status(200);
                    response.json(rows[0]);
                }
                else {
                    response.status(404);
                    response.send();
                }
            }
            catch (e) {
                console.error(e);
                response.status(500);
                response.send();
            }
        });

        server.put("/api/tables/" + tableName + "/:id", async function (request, response) {
            let {id} = request.params;

            response.status(501);
            response.send();

            // TODO: update the row in database
        });

        server.delete("/api/tables/" + tableName + "/:id", async function (request, response) {
            let {id} = request.params;

            response.status(501);
            response.send();

            // TODO: delete the row from database
        });
    }
}

server.use(express.static(path.join("dist")))
server.use("*", express.static(path.join("dist", "index.html")))

server.listen(port, hostname);
