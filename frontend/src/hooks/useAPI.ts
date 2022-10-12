import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3021'
})

export const useApi = () => ({

    validateToken: async (token:string) => {
        
         const resposta = await api.post('/validate', {token})
         return resposta.data;
        
    },
    signin: async (email:string, password: string) => {

        const resposta = await api.post('/login', {
            email, password
        })

        return resposta.data;
    }

})