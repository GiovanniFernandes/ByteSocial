import { api, settingAxios  } from "services/api";



export const useApiPost = () => ({

    newPost: async (content: string) => {


        if (content == "" || content == null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.post('/publicate', {
            content
        }, settingGeneralAxios )

        console.log("msg: ", resposta)

        return resposta.data;
    },
    

})