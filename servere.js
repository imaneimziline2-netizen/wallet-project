const http = require('http');
const server = http.createServer((req,res)=>{
    res.end('server is running');
})
server.listen(3000, ()=>{
    console.log('server running on http://localhost:3000');
})