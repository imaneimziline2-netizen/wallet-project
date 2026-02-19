let users =[
    {id:1 ,name: "imane"},
    {id:1 ,name: "hamza"}
];
// create
// bach ndiro export l chi function lcho folder akhor
// createUser hiya l function li adid lina user jdid
//  body variable drnah f sever.js 
exports.createUser =(req,res,body) => { 
    const newUser = {
        id: users.length +1,
        name: body.name
    };
    // tableau fih  uesers kanzido fih newUser
    users.push(newUser);
    // writeHead katsayb lina harder li fih status code o content typ 
res.writeHead(201,{'content-type':'application/json'});
// katift lina nresprnce
res.end(JSON.stringify(newUser));
};

// READ
exports.getUser=(req,res)=>{
    res.writeHead(200,{'content-type':'application/json'});
res.end(JSON.stringify(users));
};

// Update
exports.updateUser=(req,res,id,body)=>{
   const user = users.find(u => u.id == id);
    if(!user){
        res.writeHead(404);
        return res.end('user not found')
    }
    user.name = body.name;
    res.writeHead(200,{
        'content-typ':'application/json'
    });
    res.end(JSON.stringify(user))
};

// delet
exports.deletUser =(req,res,id)=>{
    users = users.filter(u=>u.id != id);
    res.writeHead(200);
    res.end("User deleted")
}
