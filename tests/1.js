const http = require("http");
const url = `http://localhost:6000/api/users`;
const user = {
    username: "Ann",
    age: 25,
    hobbies: ["swimming"],
};
const postOptions = {
    url: url,
    host: url,
    port: 6000,
    path: "",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(JSON.stringify(user)),
    },
};

let getAllUsers = "";
const post = http.request(postOptions, (response) => {
    let newUser = "";
    response.on("data", (chunk) => {
        newUser += chunk.toString();
    });
    response.on("end", () => {
        console.log(newUser);
        newUser = JSON.parse(newUser)._id;
    });
});
post.write(JSON.stringify(user));
post.end();
