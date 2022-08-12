var http = require("http");
let url = require("./desafio");

http.createServer(function (request, response) { 
    
    response.writeHead(301, {'Location': url});

response.end('Hello World'); }).listen(8081);
