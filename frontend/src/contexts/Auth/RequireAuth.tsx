import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContexts";


export const RequireAuth = ({ children }: { children: JSX.Element })  => {
    
    const auth = useContext(AuthContext);
    
    if(auth.user) return children;

    else return <NavLink to = '/login'> OPA clique, local não autorizado </NavLink>
}
