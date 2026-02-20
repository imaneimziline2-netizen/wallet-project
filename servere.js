const http = require("http");
const userRoutes = require("./routes/userRoute");
const walletRoutes = require("./routes/walletRoute");

const server = http.createServer((req, res) => {
    // Route pour les portefeuille

    console.log("test", req.url);
    if (req.url.startsWith("/wallets")) {
        console.log("test");
        return walletRoutes(req, res);
    }
      if (req.url.startsWith("/users")) {
        return userRoutes(req, res);
    }
    // 404 si aucune route ne correspond
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
