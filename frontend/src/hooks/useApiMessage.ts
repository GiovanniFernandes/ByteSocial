import { api, settingAxios  } from "services/api";

export const useApiMessage = () => ({

    getConversation: async () => {

        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.get('/conversations', settingGeneralAxios )

        return resposta.data;
    }

})