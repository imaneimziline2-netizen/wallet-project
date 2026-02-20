// controllers/walletController.js
const { readData, writeData } = require("../data/store");

const createWallet = (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        const { userId, name } = JSON.parse(body);
        const data = readData();

        const newWallet = {
            id: Date.now(),
            user_id: userId,
            name: name,
            sold: 0, 
        };
        data.wallets.push(newWallet);
        writeData(data);

        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify(newWallet));
    });
};

const getWallets = (req, res) => {
    const data = readData();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(data.wallets));
};

const deposit = (req, res, id) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        const { amount } = JSON.parse(body);

        if (amount <= 0) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Amount must be positive" }));
            return;
        }
        const data = readData();
        const wallet = data.wallets.find((w) => w.id === id);

        if (!wallet) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Wallet not found" }));
            return;
        }

        wallet.sold += amount; // Ajout du montant au solde
        writeData(data);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(wallet));
    });
};

const withdraw = (req, res, id) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        const { amount } = JSON.parse(body);

        if (amount <= 0) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Amount must be positive" }));
            return;
        }

        const data = readData();
        const wallet = data.wallets.find((w) => w.id === id);

        if (!wallet) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Wallet not found" }));
            return;
        }

        if (wallet.sold < amount) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Insufficient balance" }));
            return;
        }

        wallet.sold -= amount; // Retrait du montant
        writeData(data);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(wallet));
    });
};

module.exports = { createWallet, getWallets, deposit, withdraw };
