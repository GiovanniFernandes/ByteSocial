const database = require ("../database/models");
const Posts = database.Posts;
const jwt = require ('jsonwebtoken');
const util = require('util');
const promisify = util.promisify;
require('dotenv').config();

class PostController
{
    static async createPost(req,res)
    {
      try {
        const authHeader = req.headers.authorization;
        const [,token] = authHeader.split(" ");
        const {id} = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        const {content} = req.body;

        if(!content) return res.status(400).json({msg:"Digite alguma coisa antes de postar"});
        const addPost = await Posts.create({content, user_id:id});
        return res.status(201).json(addPost);

      } catch (error) {
        return res.status(500).json({msg:error.message})
      }
    }

    static async deletePost(req,res)
    {
      try {
        const{post_id} = req.params;
        const authHeader = req.headers.authorization;
        const [,token] = authHeader.split(" ");
        const {id} = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

        const postProc = await Posts.findOne({where:{id:Number(post_id)}});
        if(!postProc) return res.status(404).json({msg:"Esse post não existe!"});

        if(postProc.user_id!=id) return res.status(401).json({msg:"Você não pode apagar um post que não é seu!"});
        
        const deletingPost = await Posts.destroy({where:{id:post_id}});
        return res.status(200).json({msg:"Post deletado com sucesso!"});
      } catch (error) {
        return res.status(500).json({msg:error.message});
      }
    }
}


module.exports = PostController;