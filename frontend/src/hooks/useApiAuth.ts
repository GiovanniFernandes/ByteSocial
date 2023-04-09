import { api, settingAxios } from "services/api";


export const useApiAuth = () => ({

    validateToken: async (token:string) => {
        
        const resposta = await api.post('/validate', {token})
        return resposta.data;
        
    },
    signin: async (email:string, password: string) => {

        const resposta = await api.post('/login', {
            email, password
        },
            {
            validateStatus: (status:any) => {
                return status < 500;
            } 
        }
        )

        return resposta.data;
    },
    authGet: async ()=> {
        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false

        const resposta = await api.get('/users', settingGeneralAxios);

        return resposta.data    
        
    }

})