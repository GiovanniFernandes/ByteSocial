import { tPost } from "./Post"

export type _userProfile = {
	"user_id": string,
	"username": string,
    "count": number,
    "list" : Array<tPost>
	"connections": number,
	"requests": number
}


