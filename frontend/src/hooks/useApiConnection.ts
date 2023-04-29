import { api, settingAxios  } from "services/api";



export const useApiConnection = () => ({

    newRequest: async (id: string) => {

        if (id === "" || id === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.post(`/request/${id.toString()}`, {
            content: id
        }, settingGeneralAxios )

        return resposta.data;
    },

    undoRequest: async (id: string) => {
        return false
    },

    acceptRequest: async (id: string) => {

        if (id === "" || id === null)
            return false

        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.post(`/request/accept/${id.toString()}`,
            settingGeneralAxios)

        return resposta.data;
    },

    rejectRequest: async (id: string) => {

        if (id === "" || id === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

            const resposta = await api.delete(`/request/reject/${id.toString()}`,
            settingGeneralAxios)

        return resposta.data;
    },

    undoFriend: async (id: string) => {

        if (id === "" || id === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

            const resposta = await api.delete(`/request/cancel/${id.toString()}`,
            settingGeneralAxios)

        return resposta.data;
    },

    showRequest: async (id: string) => {

        if (id === "" || id === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.get(`/requests`, settingGeneralAxios )
        
        return resposta.data;
    }
    

})
