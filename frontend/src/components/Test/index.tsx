
import { useApiAuth } from "hooks/useApiAuth";
import { useEffect, useState } from "react"


export const Test = () => {

    const [text, setText] = useState('Xuxa');
    const apiAuth = useApiAuth();

    useEffect(()=>{
        
        textos();
        console.log("Test");
    },[])

    const textos = async () => {
        const tx = await apiAuth.authGet();
        console.log("tex: ",tx);

        const novoTexto = JSON.stringify(tx);

        setText(novoTexto);
    }

    return(
        <>
        <header>
            <h1>Bem vindo a rota de Testes </h1>
        </header>
        
            <div>
                <h3>{text}</h3>
            </div>

        
        </>
    )


}