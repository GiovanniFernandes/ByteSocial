const database = require ("../database/models");
const Users = database.Users;
const Posts = database.Posts;
const Likes = database.Likes;

class LikeController{

    static async darRetirarLike(req,res)
    {
        try {
        const {post_id} = req.params;
        const id = req.user_id;
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

    static async showLikes(req,res)
    { //Mostra quem curtiu uma postagem específica.
        try {
            const {post_id} = req.params;
            const listaLikes = await Likes.findAll({where:{post_id}});
            const post = await Posts.findOne({where:{id:post_id}}); 
            if(!post) return res.status(404).json({msg:"Postagem não existe!"});

            if(listaLikes.length==0) return res.status(200).json({likes:"Nenhum usuário curtiu sua postagem!"});
            
            return res.status(200).json({likes:listaLikes});

        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    }
}

module.exports = LikeController;