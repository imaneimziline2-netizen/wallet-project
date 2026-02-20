const { createWallet, getWallets } = require("../controllers/walletContoller");

function walletRoutes(req, res) {
    console.log("tesingt", req.method, req.url);

    if (req.method === "GET" && req.url === "/wallets") {
        return getWallets(req, res);
    }

    if (req.method === "POST" && req.url === "/wallets") {
        return createWallet(req, res);
    }

   
    if (
        req.method === "POST" &&
        req.url.startsWith("/wallets/") &&
        req.url.includes("/deposit")
    ) {
        const id = req.url.split("/")[2]; 
        console.log("Depositing to wallet ID:", id); 
        return deposit(req, res, id);
    }

    
    if (
        req.method === "POST" &&
        req.url.startsWith("/wallets/") &&
        req.url.includes("/withdraw")
    ) {
        const id = req.url.split("/")[2]; // URL
        console.log("Withdrawing from wallet ID:", id); //id
        return withdraw(req, res, id);
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
}

module.exports = walletRoutes;
