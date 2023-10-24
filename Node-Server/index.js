const http = require("http");
const app = require("./app.js");
require("dotenv").config();

const PORT = process.env.PORT  || 9090
console.log(PORT);

server = http.createServer(app);
server.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
})