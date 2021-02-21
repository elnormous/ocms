const express = require('express')

const hostname = process.env.OCMS_HOSTNAME || "localhost";
const port = process.env.OCMS_PORT || 8080;

console.log("Running server on", hostname, "port", port);

const server = express()
server.get('/', function (request, response) {
    console.log(request.query);

    response.status(200);
    response.setHeader('Content-Type', 'application/json');
    response.send('{}');
})

server.get('/test', function (request, response) {
    console.log(request.query);

    response.status(200);
    response.setHeader('Content-Type', 'application/json');
    response.send('{}');
})

server.listen(port, hostname);
