import { useApiAuth } from "hooks/useApiAuth";
import { useEffect, useState } from "react"
import { User } from "types/User";
import { AuthContext } from "./AuthContexts"



export const AuthProvider = ( {children} : {children:JSX.Element} )  => {

    const apiAuth = useApiAuth();
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        validateToken();           
    }, [])


    const validateToken = async ()=> {
        
        const storeData = localStorage.getItem('authToken');
            if(storeData){
                const data = await apiAuth.validateToken(storeData);
                if(data.status === false)
                    setUser(null)
                else if(data.status === true){
                    setUser(data.user)
                }
                     
            }
    }

    const signin = async (email:string, password:string) => {
        const data = await apiAuth.signin(email,password);

        if(data.status === true) {
            setUser(data.user);
            localStorage.setItem("authToken", data.token);
            return true;
        }

        return false;
    }
    const signout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}