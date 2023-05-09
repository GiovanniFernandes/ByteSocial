import { BsFillPersonPlusFill, BsFillPersonDashFill, BsPersonXFill } from 'react-icons/bs'
import { FaUserFriends } from 'react-icons/fa'
import styles from './ConnectionButton.module.scss'
import { eStateConnections } from 'types/eStateConnections'
import { useEffect, useReducer } from 'react'
import { useApiConnection } from 'hooks/useApiConnection'
import { IData } from 'types/IData'

interface Props {
    aboutConnection: eStateConnections,
    refresh:  React.Dispatch<React.SetStateAction<boolean>>,
    user_id: number
}
interface IAction {
    type:
    |'noConnection'
    |'requestSent'
    |'friends' 
}


const reducerButton = ( state : eStateConnections, action: IAction) => {

    const { type } = action;

    switch (type) {
        case "noConnection":
            return eStateConnections.noConnection
        case "requestSent":
            return eStateConnections.requestSent
        case "friends":
            return eStateConnections.friends
        default:
           return state
    }
}



export const ConnectionButton = ({aboutConnection, user_id, refresh}: Props) => {
    const [state, dispatch] = useReducer(reducerButton, aboutConnection)
    const apiConnection = useApiConnection();


    useEffect(() => {
        switch (aboutConnection) {
            case eStateConnections.noConnection:
                dispatch({ type: 'noConnection' }); break;
            case eStateConnections.requestSent:
                dispatch({ type: 'requestSent' }); break;
            case eStateConnections.friends:
                dispatch({ type: 'friends' }); break;
        }
    }, [aboutConnection])


    const clickNoConncetion = async () => {
        const data: IData = await apiConnection.newRequest(user_id)
        
        if (data.msg === "Solicitação enviada com sucesso!") {
            dispatch({ type: "requestSent" })

        } else if(data.msg === "Solicitação de amizade aceita!"){
            dispatch({ type: "friends" })
            refresh(true);
        } else {
            console.log("Erro: clickNoConnection")
        }
    }
    
    const clickRequestSent = async () => {

        const data: IData = await apiConnection.cancelRequest(user_id)

        if (data.msg === "Solicitação Cancelada!") {
            dispatch({ type: "noConnection" })
        }
        else 
            console.log("ERRO: clickRequestSent")

    }

    const clickFriends = async () => {
        console.log("Assista: ","https://www.youtube.com/watch?v=NAmBBzrD2vc&ab_channel=NayLima")
        
        const data: IData = await apiConnection.deleteConnection(user_id)
        
        if (data.msg === "Usuário deletado da sua lista de amigos!") {
            dispatch({ type: "noConnection" });
            refresh(true);
        } else {    
            console.log("erro em ClickFriend.")
        }

    }
    
    switch (state) {

        case eStateConnections.noConnection:
            return <>
            <button className={styles.noConnection} onClick={(clickNoConncetion)}>
             <BsFillPersonPlusFill
             className={styles.noConnection__icon}
             size={20}
             />
             <h3 className={styles.noConnection__text}>Conectar-se</h3>
           </button>
            </> 
        
        case eStateConnections.requestSent:
            return <>
                <button className={styles.requestSent} onClick={clickRequestSent}>
                 <BsPersonXFill
                 className={styles.requestSent__icon}
                 size={20}
                 />
                 <h3 className={styles.requestSent__text}>Cancelar Envio</h3>
                </button>
            </> 
        case eStateConnections.friends:
            return (
            <button className={styles.friends} onClick={clickFriends}>
                <BsFillPersonDashFill
                    className={styles.friends__icon}
                    size={20}
                />
                <h3 className={styles.friends__text}>Desconectar-se</h3>
            </button>)
        
        default:
            return<h4>Opa, deu b.o</h4>
    }
    
}
  

 /*
    Estados do botão    
    1º estágio 
        - vizualização padrão = sem connexão = noConnction = 0
            - ação = solicitaçaõ de amizade, estado alterado para o 2º estágio 
    2º estágio 
        - vizualização de quem enviou: = resquestSent = 1
            - botão de cancelar solicitação de amizade, em vermelho ou laranja
                - ação = cancela solicitação enviada, estado alterado para o 1º estágio  
        - vizualização de quem recebeu: = receivedRequest =     2 
            - botão de aceitar aceitar ou recusar amizade, seguir exemplo dos botões em perfil
                - ação aceitar = envia para o 3º estágio 
                - ação recusar = envia para o 1º estágio
    3º estágio = friend = 3 
        - vizualização de amigos
            - ação = desfazer amizade ao clicar no botão, envia para o 1º estágio
*/