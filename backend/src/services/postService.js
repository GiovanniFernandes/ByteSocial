const database = require("../database/models");
const Users = database.Users;
const Posts = database.Posts;
const Likes = database.Likes;

class PostService {

    static normalizationPosts(rows, user_id) {

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: "numeric",
            minute: "numeric"
        };

        const normalization = rows.map(e => {

            const postDate = `${new Date(e.createdAt).toLocaleDateString('pt-BR', options)}h`;

            return {
                postId: e.id.toString(),
                postUserId: e.user_id.toString(),
                postUsername: e.User.username,
                postContent: e.content,
                postDate: postDate.replace(".", "").replace(",", " ás"),
                postTotalLikes: e.Likes.length,
                userLiked: e.Likes.some(_e => _e.user_id == Number(user_id))
            }

        });

        return normalization;
    }

    static async findPosts(offset, limit) {

        const rows = await Posts.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['username']
                }, {
                    model: Likes,
                    attributes: ['username', 'user_id']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            offset: Number(offset),
            limit: Number(limit)
        });

        const count = await Posts.count();

        
        return {count, rows}
    }

    static async findUsersPosts(offset, limit, user_id) {

        const rows = await Posts.findAll({
            where: {
                user_id: Number(user_id)
            },
            include: [
                {
                    model: Users,
                    attributes: ['username']
                }, {
                    model: Likes,
                    attributes: ['username', 'user_id']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            offset: Number(offset),
            limit: Number(limit)
        });
        return {count: rows.length, rows}

    }
}

module.exports = PostService