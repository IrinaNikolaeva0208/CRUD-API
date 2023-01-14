import Database from "./db";
import * as uuid from "uuid";
import User from "../types/User";
import userObject from "../types/userObject";
import Message from "../types/message";

let usersDB: Database = new Database();

export default function (body: userObject, method: string, url: string): Message {
    let result: Message = {statusCode: 200, content:[]};
    if(method == "GET" && url == "/api/users") 
        result.content =  usersDB.getAllUsers();    
    else if (method == "GET" && url.startsWith("/api/users/")) {
        const userId: string = url.slice(url.lastIndexOf("/")+1);
        if(uuid.validate(userId)) {
            const neededUser = usersDB.getUserById(userId);
            if(neededUser) result.content = neededUser;
            else {
                result.statusCode = 404;
                result.content = "User not found"
            }
        }
        else {
            result.statusCode = 400;
            result.content = "Invalid ID"
        }
    }
    else if (method == "POST" && url == "/api/users") {
        const user: User = {...body, id: uuid.v4().toString()}
        //console.log(body);
        result.content = usersDB.createUser(user);
        result.statusCode = 201;
    }
    else if (method == "PUT" && url.startsWith("/api/users/")) {
        const userId: string = url.slice(url.lastIndexOf("/")+1);
        if(uuid.validate(userId)) {
            const neededUser = usersDB.getUserById(userId);
            if(!neededUser) {
                result.statusCode = 404;
                result.content = "User not found"
            }
            else {
                const user: User = {...body, id: userId}
                result.content = usersDB.updateUser(user);
            }
        }
        else {
            result.statusCode = 400;
            result.content = "Invalid ID"
        }

    }
    else if (method == "DELETE" && url.startsWith("/api/users/")) {
        const userId: string = url.slice(url.lastIndexOf("/")+1);
        if (uuid.validate(userId)) {
            const neededUser = usersDB.removeUser(userId);
            if(!neededUser) {
                result.statusCode = 404;
                result.content = "User not found"
            }
            else result.statusCode = 204;
        }
        else {
            result.statusCode = 400;
            result.content = "Invalid ID"
        }
    }
    else {
        result.statusCode = 404;
        result.content = "Source does not exist"
    }
    return result;
}