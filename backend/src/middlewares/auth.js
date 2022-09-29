const jwt = require('jsonwebtoken');
require('dotenv').config();


function auth (req, res, next){

    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({msg: "Token não identificado"});
    }
        
    const [,token] = authHeader.split(" ");

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET, (error,data)=>{
            if(error)
            {
                return res.status(401).json({msg:"Falha na autenticação do token"});
            }
            else{
            
                req.user_id = data.id;
                req.token = token;
                console.log(data, req.token, req.user)
                return next();
            } 
        } )
    } catch (error) {
        return res.status(500).json("Erro no servidor");
    }
}


module.exports = auth
