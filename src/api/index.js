const express = require("express")
const path = require("path")

const hostname = process.env.OCMS_HOSTNAME || "localhost";
const port = process.env.OCMS_PORT || 8080;

console.log("Running server on", hostname, "port", port);

const server = express()

server.get("/test", function (request, response) {
    console.log(request.query);

    response.status(200);
    //response.setHeader("Content-Type", "application/json");
    response.json({});
})

server.use(express.static(path.join("dist")))
server.use("*", express.static(path.join("dist", "index.html")))

server.listen(port, hostname);
