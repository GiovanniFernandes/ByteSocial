import { api, settingAxios  } from "services/api";



export const useApiConnection = () => ({

    newRequest: async (idNewConnection: string) => {

        if (idNewConnection === "" || idNewConnection === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.post('/publicate', {
            content: idNewConnection
        }, settingGeneralAxios )

        return resposta.data;
    },

    showPosts: async (offset:number) => {

        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false
        
        const resposta = await api.get(`/posts/${offset.toString()}`,
        settingGeneralAxios )

        return resposta.data;
    }
    

})

/*

Enviar solicitação / request 

desfazer solicitação

Aceitar solicitação de amizade

Rejeitar solicitação de amizade 

desfazer amizade


*/