// controllers/userController.js
const { readData, writeData } = require("../data/store");


const createUser = (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        const { name } = JSON.parse(body);  
        const data = readData(); 

        const newUser = {
            id: Date.now(),  
            name: name,
        };
        
        data.users.push(newUser); 
        writeData(data);  

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));  
    });
};


const getUsers = (req, res) => {
    const data = readData();  
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data.users)); 
};


const updateUser = (req, res, id) => {
    let body = "";
    
    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        const { name } = JSON.parse(body);  
        const data = readData();  

      
        const user = data.users.find((u) => u.id == id);
        if (!user) {  
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "User not found" }));
            return;
        }

        user.name = name;  
        writeData(data);  

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));  
    });
};


const deleteUser = (req, res, id) => {
    const data = readData();  
    const userIndex = data.users.findIndex((u) => u.id == id); 

    if (userIndex === -1) {  
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "User not found" }));
        return;
    }

   
    data.users.splice(userIndex, 1);
    writeData(data);  
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User deleted" }));  
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
