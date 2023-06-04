export type tPost = {
    "postId": string,
	"postUserId": string,
	"postUsername": string,
	"postContent": string,
    "postDate": string,
    "postTotalLikes": number,
    "userLiked": boolean
}

export type aboutPosts = {
    "count": number,
    "list" : Array<tPost>
}
  