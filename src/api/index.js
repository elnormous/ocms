const express = require("express")
const path = require("path")
const fs = require('fs');
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

server.get("/config", function (request, response) {
    console.log(request.query);

    response.status(200);
    //response.setHeader("Content-Type", "application/json");
    response.json(config);
});

if (config["tables"] !== undefined) {
    const tables = config["tables"];
    console.log(tables);

    for (const i in tables) {
        const table = tables[i];
        
        server.get("/tables/" + i, function (request, response) {
            response.status(200);
            response.json({"name": i});
        });

        // TODO: post

        server.get("/tables/" + i + "/:id", function (request, response) {
            let {id} = request.params;
            response.status(200);
            response.json({"id": id});
        });

        // TODO: put, delete
    }
}

server.use(express.static(path.join("dist")))
server.use("*", express.static(path.join("dist", "index.html")))

server.listen(port, hostname);
