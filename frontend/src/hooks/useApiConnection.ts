import { api, settingAxios  } from "services/api";



export const useApiConnection = () => ({

    newRequest: async (id: number) => {

        if (id === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.post(`/request/${id.toString()}`,
            {}, settingGeneralAxios)

        return resposta.data;
    },

    cancelRequest: async (id: number) => {
        if (id === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

            const resposta = await api.delete(`/request/cancel/${id.toString()}`,
                settingGeneralAxios)
        
        return resposta.data;
    },

    acceptRequest: async (id: number) => {

        if (id === null)
            return false

        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false
        const resposta = await api.post(`/request/accept/${id.toString()}`,{},
            settingGeneralAxios)
        
        return resposta.data;
    },

    rejectRequest: async (id: number) => {

        if (id === null)  return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

            const resposta = await api.delete(`/request/reject/${id.toString()}`,
            settingGeneralAxios)

        return resposta.data;
    },
    
    showRequests: async () => {
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.get(`/requests`, settingGeneralAxios )
        
        return resposta.data;
    }
    

})
