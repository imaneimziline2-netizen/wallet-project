const http = require('http');
const userRoutes = require('./routes/userRoute');
const walletRoutes = require('./routes/walletRoute'); 

const server = http.createServer((req, res) => {
  
    if (userRoutes(req, res) !== null) return;


    if (walletRoutes(req, res) !== null) return;

   
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
