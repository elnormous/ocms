const express = require("express")
const path = require("path")
const fs = require('fs');

const hostname = process.env.OCMS_HOSTNAME || "localhost";
const port = process.env.OCMS_PORT || 8080;

let config = {};

try {
    let configData = fs.readFileSync('./config.json');
    config = JSON.parse(configData);
}
catch (err) {
    console.error('Failed to load config, error:', err)
}

console.log("Running server on", hostname, "port", port);

const server = express()

server.get("/config", function (request, response) {
    console.log(request.query);

    response.status(200);
    //response.setHeader("Content-Type", "application/json");
    response.json(config);
});

server.use(express.static(path.join("dist")))
server.use("*", express.static(path.join("dist", "index.html")))

server.listen(port, hostname);
