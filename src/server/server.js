"use strict";
exports.__esModule = true;
var routes_1 = require("../routes/routes");
var http = require("http");
var dotenv = require("dotenv");
dotenv.config({ path: __dirname + '/.env' });
var PORT = process.env.PORT;
var server = http.createServer(function (request, response) {
    try {
        var requestBody_1 = {
            username: "",
            age: 0,
            hobbies: []
        };
        var reqStr_1 = '';
        request.on("data", function (chunk) {
            reqStr_1 += chunk.toString();
        });
        request.on("end", function () {
            try {
                if (request.method == "POST" || request.method == "PUT")
                    if (reqStr_1.includes("\"username\"") && reqStr_1.includes("\"age\"") && reqStr_1.includes("\"hobbies\"")) {
                        requestBody_1 = Object.assign(JSON.parse(reqStr_1));
                    }
                    else
                        response.writeHead(400).end(JSON.stringify({ message: "Wrong data" }));
                if (response.statusCode != 400) {
                    var result = (0, routes_1["default"])(requestBody_1, request.method || "", request.url || "");
                    response.writeHead(result.statusCode).end(JSON.stringify(result.statusCode < 300 ? result.content : { message: result.content }));
                }
            }
            catch (err) {
                response.writeHead(400).end(JSON.stringify({ message: "Wrong data format" }));
            }
        });
    }
    catch (err) {
        response.writeHead(500).end(JSON.stringify({ message: "Server error. Try again later." }));
    }
});
server.listen(PORT, function () {
    console.log("Server started on port ".concat(PORT));
});
