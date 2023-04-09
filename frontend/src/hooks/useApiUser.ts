import { api, settingAxios } from "services/api";


export const useApiUser = () => ({

    novoUsuario: async (username:string, email:string, password:string) => {
        
        const resposta = await api.post('/cadastro', {
            username,
            email,
            password
        },
        {
            validateStatus: (status) => {
              return status < 500; // Resolve somente se o código de status for menor que 500
            }
        }
        )
        
        return resposta.data
    },

    changePassword: async (newPassword:String) => {

        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false
        
        const resposta = await api.put('/user/change/pass',{
            newPassword
        }, settingGeneralAxios);

        return resposta.data
    },

    changeEmail: async (email:String) => {

        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false
        
        const resposta = await api.put('/user/change/email',{
            email
        }, settingGeneralAxios);

        return resposta.data
    },
    changeName: async (username:String) => {

        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false
        
        const resposta = await api.put('/user/change/username',{
            username
        }, settingGeneralAxios);

        return resposta.data
    },
    
    deletaUsuario: async () => {

        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false
        
        const resposta = await api.delete('/user', settingGeneralAxios);

        return resposta.data
    },

    getUserProfile: async (id:string, offset:number) => {

        const settingGeneralAxios = settingAxios();

        if (!settingGeneralAxios)
            return false
        
        const resposta = await api.get(`/profile/${id}/${offset.toString()}`,
        settingGeneralAxios)
        
        return resposta.data;



    }

})
