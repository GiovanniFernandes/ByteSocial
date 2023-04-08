export type tPost = {
    "postId": string,
	"postUserId": string,
	"postUsername": string,
	"postContent": string,
	"postDate": string
}

export type aboutPosts = {
    "count": number,
    "list" : Array<tPost>
  }