"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var db_1 = require("./db");
var uuid = require("uuid");
var usersDB = new db_1["default"]();
function default_1(body, method, url) {
    var result = { statusCode: 200, content: [] };
    if (method == "GET" && url == "/api/users")
        result.content = usersDB.getAllUsers();
    else if (method == "GET" && url.startsWith("/api/users/")) {
        var userId = url.slice(url.lastIndexOf("/") + 1);
        if (uuid.validate(userId)) {
            var neededUser = usersDB.getUserById(userId);
            if (neededUser)
                result.content = neededUser;
            else {
                result.statusCode = 404;
                result.content = "User not found";
            }
        }
        else {
            result.statusCode = 400;
            result.content = "Invalid ID";
        }
    }
    else if (method == "POST" && url == "/api/users") {
        var user = __assign({ id: uuid.v4().toString() }, body);
        result.content = usersDB.createUser(user);
        result.statusCode = 201;
    }
    else if (method == "PUT" && url.startsWith("/api/users/")) {
        var userId = url.slice(url.lastIndexOf("/") + 1);
        if (uuid.validate(userId)) {
            var neededUser = usersDB.getUserById(userId);
            if (!neededUser) {
                result.statusCode = 404;
                result.content = "User not found";
            }
            else {
                var user = __assign(__assign({}, body), { id: userId });
                result.content = usersDB.updateUser(user);
            }
        }
        else {
            result.statusCode = 400;
            result.content = "Invalid ID";
        }
    }
    else if (method == "DELETE" && url.startsWith("/api/users/")) {
        var userId = url.slice(url.lastIndexOf("/") + 1);
        if (uuid.validate(userId)) {
            var neededUser = usersDB.removeUser(userId);
            if (!neededUser) {
                result.statusCode = 404;
                result.content = "User not found";
            }
            else
                result.statusCode = 204;
        }
        else {
            result.statusCode = 400;
            result.content = "Invalid ID";
        }
    }
    else {
        result.statusCode = 404;
        result.content = "Source does not exist";
    }
    return result;
}
exports["default"] = default_1;
