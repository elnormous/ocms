var http = require('http');
var url = require('url');

console.log("Starting");

console.log(process.env.CONFIG);

const server = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});

    console.log(request.method);

    const requestUrl = url.parse(request.url);

    console.log(requestUrl);

    response.write('{}');
    response.end();
});
server.listen(8080);
