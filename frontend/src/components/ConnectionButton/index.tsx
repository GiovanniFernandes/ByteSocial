import { BsFillPersonPlusFill } from 'react-icons/bs'
import styles from './ConnectionButton.module.scss'
import { eStateConnections } from 'types/eStateConnections'


interface Props {

    aboutConnetion: eStateConnections,
    setAboutConnetion: React.Dispatch<React.SetStateAction<eStateConnections>>
}


export const ConnectionButton = (props:Props) => {
    

    const click03 = () => {
        props.setAboutConnetion(eStateConnections.requestSent)
    }
    const click02 = () => {
        props.setAboutConnetion(eStateConnections.friends)
    }
    const click01 = () => {
        props.setAboutConnetion(eStateConnections.unrelated)
    }

/*
    Estados do botão    
    1º estágio 
        - vizualização padrão
            - ação = solicitaçaõ de amizade, estado alterado para o 2º estágio 
    2º estágio 
        - vizualização de quem enviou:
            - botão de cancelar solicitação de amizade, em vermelho ou laranja
                - ação = cancela solicitação enviada, estado alterado para o 1º estágio  
        - vizualização de quem recebeu: 
            - botão de aceitar aceitar ou recusar amizade, seguir exemplo dos botões em perfil
                - ação aceitar = envia para o 3º estágio 
                - ação recusar = envia para o 1º estágio
    3º estágio
        - vizualização de amigos
            - ação = desfazer amizade ao clicar no botão, envia para o 1º estágio
*/

    switch (props.aboutConnetion) {

        case eStateConnections.friends:
            return <button className={styles.connect} onClick={click01}>
                <BsFillPersonPlusFill
                    className={styles.connect__icon}
                    size={20}
                />
                <h3 className={styles.connect__text}>Best Friend</h3>
            </button>
        
        case eStateConnections.requestSent:
            return <>
                <button className={styles.connect} onClick={click02}>
                 <BsFillPersonPlusFill
                 className={styles.connect__icon}
                 size={20}
                 />
                 <h3 className={styles.connect__text}>enviado</h3>
             </button>
            </> 
        
        case eStateConnections.unrelated:
            return <>
            <button className={styles.connect} onClick={click03}>
             <BsFillPersonPlusFill
             className={styles.connect__icon}
             size={20}
             />
             <h3 className={styles.connect__text}>Conectar-se</h3>
           </button>
            </> 
        
        default:
            return<h4>Opa, deu b.o</h4>
  }
  }