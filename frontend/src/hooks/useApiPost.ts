import { api, settingAxios  } from "services/api";



export const useApiPost = () => ({

    newPost: async (content: string) => {

        if (content === "" || content === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.post('/publicate', {
            content
        }, settingGeneralAxios )

        return resposta.data;
    },

    showPosts: async (offset:number) => {

        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false
        
        const resposta = await api.get(`/posts/${offset.toString()}`,
            settingGeneralAxios)
        
        return resposta.data;
    },

    iLike: async (post_id:string) => {
        
        if (post_id === "" || post_id === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.post(`/like/${post_id}`,
            {}, settingGeneralAxios)

        return resposta.data;
    },

    deletePost: async (post_id: string) => {

        if (post_id === "" || post_id === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.delete(`/posts/${post_id}`, settingGeneralAxios)

        return resposta.data;
    }
    



})