// routes/walletRoute.js
const {
    createWallet,
    getWallets,
    deposit,
    withdraw,
} = require("../controllers/walletContoller");

function walletRoutes(req, res) {
    if (req.method === "GET" && req.url === "/wallets") {
        return getWallets(req, res);
    }

    if (req.method === "POST" && req.url === "/wallets") {
        return createWallet(req, res);
    }

    if (req.method === "POST" && req.url.startsWith("/wallets/") && req.url.includes("/deposit")) {
        const id = req.url.split("/")[2];
        return deposit(req, res, id);
    }

    if (req.method === "POST" && req.url.startsWith("/wallets/") && req.url.includes("/withdraw")) {
        const id = req.url.split("/")[2];
        return withdraw(req, res, id);
    }

    return null;
}

module.exports = walletRoutes;
