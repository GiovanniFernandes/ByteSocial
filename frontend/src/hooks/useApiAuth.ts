import { api } from "services/api";


export const useApiAuth = () => ({

    validateToken: async (token:string) => {
        
         const resposta = await api.post('/validate', {token})
         return resposta.data;
        
    },
    signin: async (email:string, password: string) => {

        const resposta = await api.post('/login', {
            email, password
        })

        return resposta.data;
    },
    authGet: async ()=> {
        const storeData = localStorage.getItem('authToken');
        
        if(!storeData) return false;
        
        const axiosConfig = {
            headers: {
                Authorization: "Bearer "+storeData
            } 
        }

        const resposta = await api.get('/users', axiosConfig);

        return resposta.data    
        
    }

})