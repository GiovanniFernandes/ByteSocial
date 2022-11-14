const database = require ("../database/models");
const Users = database.Users;
const Posts = database.Posts;
const Likes = database.Likes;
const jwt = require ('jsonwebtoken');
const util = require('util');
const promisify = util.promisify;
require('dotenv').config();


class LikeController{

    static async darRetirarLike(req,res)
    {
        try {
        const {post_id} = req.params;
        const authHeader = req.headers.authorization;
        const [,token] = authHeader.split(" ");
        const {id} = await promisify(jwt.verify)(token,process.env.JWT_SECRET); //Seu id
        const post = await Posts.findOne({where:{id:post_id}});

        if(!post) return res.status(400).json({msg:"Postagem não existe!"});
        
        const {username} = await Users.findOne({where:{id}});

        const verifyLike = await Likes.findOne({where:{user_id:id, post_id}});

        if(verifyLike)
        {
            const dislike = await Likes.destroy({where:{user_id:id, post_id, username}});
            return res.status(200).json({msg:"+1 👎"});
        }

        const like = await Likes.create({user_id:id, post_id, username});

        return res.status(201).json({msg:"+1 👍"});

        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    }
}

module.exports = LikeController;