import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContexts";


export const RequireAuth = ({ children }: { children: JSX.Element })  => {
    const auth = useContext(AuthContext);
    
    if(auth.user){
        return children;
    }
    else {
        return (
            <NavLink to ="/login"> Opa, rota protegida, clique aqui para ser redirecionado para o Login</NavLink>
        )
    }
 
//<Link to/> também serve 

}

/*
    Obs sobre Navigate, vulgo meu estresse de um dia inteiro,
    o react passa pelo arquivo que será renderizado checando, ou seja lá o que for, o navigate 
    atualiza a página, de tal forma que reseta os states dos contextos; 

    Obs2, não sei quanto ao useNavigate, não foi possível sua utilização, o ts barrava, possivelmente daria 
    problema em js
*/