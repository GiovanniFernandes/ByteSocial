import { api, settingAxios  } from "services/api";

export const useApiConnection = () => ({

    deleteFriendship: async (id: number) => {

        if (id === null)
            return false
        
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.delete(`/connection/${id.toString()}`,
            settingGeneralAxios)

        return resposta.data;
    },
    
    showConnections: async () => {
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.get(`/connections`, settingGeneralAxios)
        
        return resposta.data;
    }
    

})
