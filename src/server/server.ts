import * as http from "http";
import * as dotenv from "dotenv";
import userObject from "../types/userObject";
import routes from "../routes/routes";
dotenv.config({ path: __dirname+'/.env' });

const PORT = process.env.PORT;
const server = http.createServer((request, response) => {
   try {
        let requestBody: userObject = {
            username: "",
            age: 0,
            hobbies: []
        };

        let reqStr = '';
        request.on("data", (chunk) => {
            reqStr += chunk.toString();
        });
        request.on("end", () => {
            try {
                if(request.method == "POST" || request.method == "PUT")
                    if(reqStr.includes("\"username\"") && reqStr.includes("\"age\"") && reqStr.includes("\"hobbies\"")) {
                    requestBody = Object.assign(JSON.parse(reqStr));
                }
                    else response.writeHead(400).end(JSON.stringify({message: "Wrong data"}));
                if(response.statusCode != 400) {
                    const result = routes(requestBody, request.method || "", request.url || "");
                    response.writeHead(result.statusCode).end(JSON.stringify(result.statusCode < 300 ? result.content : {message : result.content}));
                }
            }
            catch (err) {
                response.writeHead(400).end(JSON.stringify({message: "Wrong data format"}));
            }
        })
    }
    catch (err) {
       response.writeHead(500).end(JSON.stringify({message: "Server error. Try again later."}));
    } 

});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
