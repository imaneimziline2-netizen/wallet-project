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
    }
};
users.push(newUser);
res.writeHead()