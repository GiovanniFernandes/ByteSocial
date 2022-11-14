const database = require ("../database/models");
const Posts = database.Posts;
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const util = require('util');
const promisify = util.promisify;
require('dotenv').config();

class PostController

{
    static async createPost(req,res)
    {
      //Adicionar regras de negócio, em breve...

    }
}


module.exports = PostController;