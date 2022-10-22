import { api } from "services/api";


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
        /*        
        if(resposta.status >=500)
            resposta.data.msg = 'Erro no servidor !'
        */

        return resposta.data
        

        
    }

})
/*

}

*/