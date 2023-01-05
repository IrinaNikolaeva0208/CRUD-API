import * as http from "http";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const PORT = process.env.PORT;
const server = http.createServer((request, response) => {
   try {
       
    }
    catch (err) {
        response.writeHead(500).end(JSON.stringify({message: "Server error. Try again later."}));
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
