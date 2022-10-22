const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth (req, res, next){

    const authToken = req.headers.authorization;
    
    if(!authToken) return res.status(400).json({msg: "token não identificado"});
        
    const [,token] = authToken.split(" ");

    jwt.verify(token, process.env.JWT_SECRET, (error,data) => {

        if(error){
            return res.status(401).json({err:"Falha na autenticação do token"});
        }
        else{
            req.user_id = data.id;
            req.token = token;
            return next();
        }  
    })
}

module.exports = auth
