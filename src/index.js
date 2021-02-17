const express = require('express')

console.log("Starting");
console.log(process.env.CONFIG);

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

server.listen(8080);
