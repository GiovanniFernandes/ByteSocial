

class PostService {

    static normalizationPosts(rows){
    
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: "numeric",
        minute: "numeric", };  
        
        const normalization = rows.map(e => {
          
            const postDate = `${new Date(e.createdAt).toLocaleDateString('pt-BR', options)}h`;
          
            return {
                postId: e.id.toString(),
                postUserId: e.user_id.toString(),
                postUsername: e.User.username,
                postContent: e.content,
                postDate: postDate.replace(".", " ").replace(",", " ás ")
            }
        
        });
        
        return normalization;
    }
}




module.exports= PostService