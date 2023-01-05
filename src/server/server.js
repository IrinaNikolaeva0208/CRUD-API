"use strict";
exports.__esModule = true;
var http = require("http");
var dotenv = require("dotenv");
dotenv.config({ path: __dirname + '/.env' });
var PORT = process.env.PORT;
var server = http.createServer(function (request, response) {
    try {
    }
    catch (err) {
        response.writeHead(500).end(JSON.stringify({ message: "Server error. Try again later." }));
    }
});
server.listen(PORT, function () {
    console.log("Server started on port ".concat(PORT));
});
