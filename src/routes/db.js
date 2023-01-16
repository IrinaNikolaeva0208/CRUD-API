"use strict";
exports.__esModule = true;
var Database = /** @class */ (function () {
    function Database() {
        this.dbArray = [];
    }
    Database.prototype.createUser = function (user) {
        this.dbArray.push(user);
        return user;
    };
    Database.prototype.removeUser = function (id) {
        var userIndex = this.dbArray.findIndex(function (item) { return item.id == id; });
        if (userIndex != -1) {
            var removedUser = this.dbArray[userIndex];
            this.dbArray.splice(userIndex, 1);
            return removedUser;
        }
        return null;
    };
    Database.prototype.getUserById = function (id) {
        return this.dbArray.find(function (item) { return item.id == id; }) || null;
    };
    Database.prototype.getAllUsers = function () {
        return this.dbArray;
    };
    Database.prototype.updateUser = function (user) {
        var userIndex = this.dbArray.findIndex(function (item) { return item.id == user.id; });
        this.dbArray[userIndex] = user;
        return user;
    };
    return Database;
}());
exports["default"] = Database;
