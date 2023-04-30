import { BsFillPersonPlusFill } from 'react-icons/bs'
import { FaUserFriends } from 'react-icons/fa'
import styles from './ConnectionButton.module.scss'
import { eStateConnections } from 'types/eStateConnections'
import { useEffect, useReducer } from 'react'
import { useApiConnection } from 'hooks/useApiConnection'

interface Props {
    aboutConnection: eStateConnections,
    setAboutConnetion?: React.Dispatch<React.SetStateAction<eStateConnections>>,
    user_id: number
}
interface IAction {
    type:
    |'noConnection'
    |'requestSent'
    |'receivedRequest'
    |'friends' 
}

enum eRequestSent {
    accept, reject
}

const reducerButton = ( state : eStateConnections, action: IAction) => {

    const { type } = action;

    switch (type) {
        case "noConnection":
            return eStateConnections.noConnection
        case "requestSent":
            return eStateConnections.requestSent
        case "receivedRequest":
            return eStateConnections.receivedRequest
        case "friends":
            return eStateConnections.friends
        default:
           return state
    }
}



export const ConnectionButton = ({aboutConnection, user_id}: Props) => {
    const [state, dispatch] = useReducer(reducerButton, aboutConnection)
    const apiConnection = useApiConnection();


    useEffect(() => {
        switch (aboutConnection) {
            case eStateConnections.noConnection:
                dispatch({ type: 'noConnection' }); break;
            case eStateConnections.requestSent:
                dispatch({ type: 'requestSent' }); break;
            case eStateConnections.receivedRequest:
                dispatch({ type: 'receivedRequest' }); break;
            case eStateConnections.friends:
                dispatch({ type: 'friends' }); break;
        }
    }, [aboutConnection])


    const clickNoConncetion = async () => {
        //dispatch({ type: "receivedRequest" })
        const data:any = await apiConnection.newRequest(user_id)
        
        console.log(data)
        if (data !== false) {
             dispatch({ type: "requestSent" })
        }

    }
    
    const clickRequestSent = async () => {

        const data: any = await apiConnection.cancelRequest(user_id)

        if(data)
            dispatch({ type: "noConnection" })
        else 
            console.log("ERRO: clickRequestSent")

    }

    const clickReceivedRequest = async (request: eRequestSent) => {
        if (request === eRequestSent.accept) {

            const data: any = await apiConnection.acceptRequest(user_id)

            if (data)
                dispatch({ type: "friends" })
            else
                console.log("erro clickReceivedRequest accept")

            
        }
        else {
            const data: any = await apiConnection.rejectRequest(user_id)

            if (data)
                dispatch({ type: "noConnection" })
            else
                console.log("erro clickReceivedRequest reject")
                
        }
    }

    const clickFriends = async () => {
        console.log("https://www.youtube.com/watch?v=NAmBBzrD2vc&ab_channel=NayLima")
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
                 <BsFillPersonPlusFill
                 className={styles.requestSent__icon}
                 size={20}
                 />
                 <h3 className={styles.requestSent__text}>enviado</h3>
                </button>
            </> 
        
        case eStateConnections.receivedRequest:
            return (
                <div className={styles.receivedRequest}>
                    <button className={styles.receivedRequest_accept}
                        onClick={() => clickReceivedRequest(eRequestSent.accept)}>
                        <BsFillPersonPlusFill
                        className={styles.receivedRequest_accept__icon}
                        size={20}
                        />
                        <h3 className={styles.receivedRequest_accept__text}>aceitar</h3>
                    </button>
                    <button className={styles.receivedRequest_refect}
                        onClick={() => clickReceivedRequest(eRequestSent.reject)}>
                        <BsFillPersonPlusFill
                        className={styles.receivedRequest_refect__icon}
                        size={20}
                        />
                        <h3 className={styles.receivedRequest_refect__text}>rejeitar</h3>
                    </button>
                </div>
            )
        
        case eStateConnections.friends:
            return (
            <button className={styles.friends} onClick={clickFriends}>
                <FaUserFriends
                    className={styles.friends__icon}
                    size={20}
                />
                <h3 className={styles.friends__text}>Best Friend</h3>
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