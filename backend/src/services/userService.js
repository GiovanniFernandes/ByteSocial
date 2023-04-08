const bcrypt = require("bcrypt");
const database = require ("../database/models");
const Users = database.Users;

class userService {

    static hashDaSenha(pass){
        if(!pass)
        {
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt);
        return hash;
    }

    static async findEmail(email)
    {
        const usuarios = await Users.findAll({where:{email}});
        if(usuarios.length>0)
        {
        return true;
        }
        return false;
    }

}

module.exports = userService;