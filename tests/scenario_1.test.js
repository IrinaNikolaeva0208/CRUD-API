const User = require("../src/types/User");
const userObject = require("../src/types/userObject");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/server/.env" });
const url = `http://localhost:${process.env.PORT}/api/users`;

test("Scenario #1", () => {
    // const user = {
    //     username: "Ann",
    //     age: 25,
    //     hobbies: ["swimming"],
    // };
    // const postOptions = {
    //     hostname: "mockbin.com",
    //     port: 80,
    //     path: "/",
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         "Content-Length": Buffer.byteLength(JSON.stringify(user)),
    //     },
    // };
    // const deleteOptions = {
    //     path: "",
    //     // port: 80,
    //     method: "POST",
    //     url: url,
    // };
    // const message = {
    //     message: "User not found",
    // };

    http.get(url, (response) => {
        let getAllUsers = "";
        response.on("data", (chunk) => {
            getAllUsers = chunk.toString();
        });
        response.on("end", () => {
            getAllUsers = JSON.parse(getAllUsers);
            expect(getAllUsers).toEqual([]);
        });
    });

    // new Promise((res, rej) => {
    // const post = http.request(postOptions, (response) => {
    //     let newUser = "";
    //     response.on("data", (chunk) => {
    //         newUser += chunk.toString();
    //     });
    //     response.on("end", () => {
    //         newUser = JSON.parse(newUser)._id;
    //         res(user);
    //     });
    // });
    // post.write(JSON.stringify(user));
    // post.end();
    // });
    // .then((id) => {
    //     http.get(url + "/" + id, (response) => {
    //         let getMessage = "";
    //         response.on("data", (chunk) => {
    //             getMessage += chunk.toString();
    //         });
    //         response.on("end", () => {
    //             getMessage = JSON.parse(getMessage);
    //             expect(getMessage).toEqual(message);
    //         });
    //     });
    // })
    // .then((id) => {
    //     deleteOptions.url = url + "/" + id;
    //     const delet = http.request(deleteOptions, (response) => {});
    //     return id;
    // })
    // .then((id) => {
    //     http.get(url + "/" + id, (response) => {
    //         let getMessage = "";
    //         response.on("data", (chunk) => {
    //             getMessage += chunk.toString();
    //         });
    //         response.on("end", () => {
    //             getMessage = JSON.parse(getMessage);
    //             expect(getMessage).toEqual(message);
    //         });
    //     });
    // });
});
