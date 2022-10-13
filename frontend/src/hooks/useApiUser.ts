import { api } from "services/api";


export const useApiUser = () => ({

    novoUsuario: async (username:string, email:string, password:string) => {
        
         const resposta = await api.post('/cadastro', {
            username,
            email,
            password
         })
         return resposta.data;
        
    }

})