const bcrypt = require("bcrypt");
const database = require ("../database/models");
const Users = database.Users;

class userService {

    static async pegaTodosUsuarios()
    {
        const usuarios = await Users.findAll();
            usuarios.forEach(user=>
                {
                    if(user.password!=undefined)
                    {
                        user.password=undefined;
                    }
                })
        return usuarios;
    }


}

module.exports = userService;