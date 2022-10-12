import { useApi } from "hooks/useAPI";
import { useEffect, useState } from "react"
import { User } from "types/User";
import { AuthContext } from "./AuthContexts"



export const AuthProvider = ( {children} : {children:JSX.Element} )  => {

    const [user, setUser] = useState< User | null>(null);
    const [cont, setCont] = useState(0);
    const api = useApi();

    useEffect(()=>{
        validateToken();
    },[user])

    const contador = () => setCont(cont+1);

    const validateToken = async () => {
        const storeData = localStorage.getItem('authToken');
        if(storeData){
             const data = await api.validateToken(storeData);
                if(data.user){
                    console.log("data.user ::::::: ", data.user, "cont ", cont)
                    contador();
                    setUser(data.user)
                    console.log("user::::::: ", user, "cont ", cont)
                }
        }
        else {

        }

    }


    const signin = async (email:string, password:string) => {
        const data = await api.signin(email,password);

        if(data.user && data.token) {
            setUser(data.user);
            localStorage.setItem("authToken", data.token);

            console.log("data", data);
            return true;
        }

        return false;
    }
    const signout = () => {
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}