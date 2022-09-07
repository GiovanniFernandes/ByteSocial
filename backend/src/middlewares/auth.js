const jwt = require('jsonwebtoken');
require('dotenv').config();



function auth (req, res, next){

    const authToken = req.headers.authorization;
    
    if(authToken === undefined){
        return res.status(400).json({msg: "token não identificado"});
    }
        
    const bearerCompleto = authToken.split(' ');
    const token = bearerCompleto[1];
    
    
    jwt.verify(token, process.env.JWT_SECRET, (err,data) => {

        if(err){
            return res.status(401).json({err:"falha na autenticação do token"});
        }
        else{
            
            req.user_id = data.id;
            req.token = token;
            return next();
        }  
    })
}


module.exports = auth
