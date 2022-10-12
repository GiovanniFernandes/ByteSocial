import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContexts";



export const RequireAuth = ({ children }: { children: JSX.Element })  => {
    const auth = useContext(AuthContext);

    if(!auth.user){
        return <Navigate to ='/register'/>
    }

    return children;

}

