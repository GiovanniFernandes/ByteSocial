import { AuthContext } from 'contexts/Auth/AuthContexts';
import { useApiUser } from 'hooks/useApiUser';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraSvg } from './assets/CameraSVG';
import { DeletePersonSvg } from './assets/DeletePersonSvg';
import { ChangeTextField } from './ChangeTextField';

import styles from './Settings.module.scss'

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}


export default function Settings(props: Props) {

    const apiUser = useApiUser();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");


    useEffect(() => {
        props.setSelectedMenu(3)
    }, [])

    const changeName = async (data:string) => {

    if(data === '') return

    const response = await apiUser.changeName(data);

    if(response.status === false) 
        setErrorUsername("Não foi possível atualizar seu nome");
    else {
        setErrorUsername("");
        auth.validateToken();
    }
    
    }

    const changeEmail = async (data:string) => {

    if(data === '') return

    const response = await apiUser.changeEmail(data)

    if(response.status === false) 
        setErrorEmail("Não foi possível atualizar o email")
    else 
        setErrorEmail("")
    }
 
    const changePassword = async (data:string) => {

    if(data === '') return

    const oldPassword = window.prompt("Digite sua senha antiga: ");

    if(oldPassword === null) return
    else if(oldPassword === ''){
        window.alert("Se faz necessário a sua senha antiga para prosseguir com a mudança de senha !")
        changePassword(data);
        return
    }

    const response = await apiUser.changePassword(oldPassword,data)

    if(response.status === false) 
        setErrorPassword("Não foi possível atualizar a senha")
    else 
        setErrorPassword("")
    }

    const deleteAccount = async () => {

    const confirmation = window.confirm(("Tem certeza que deseja deletar esta conta ? ")); 

    if (confirmation === true) {
        
        const response = await apiUser.deletaUsuario();
        if(response.status === false) 
            window.alert(`Falha ao deletar conta: ${response.msg}`)
        
        else {
            window.alert(`Conta deletada com sucesso: ${response.msg}`)
            auth.signout();
            navigate("/login");
        }
    }
    }

    const listTextField = [
    {
        type: "text",
        placeholder:"Nome de usuário",
        id:"NomeDeUsuario",
        fieldName:"Nome",
        aoClick: changeName,
        err: errorUsername
    },
    {
        type: "email",
        placeholder:"email@email",
        id:"email",
        fieldName:"Email",
        aoClick: changeEmail,
        err: errorEmail
    },
    {
        type: "password",
        placeholder:"*****************",
        id:"password",
        fieldName:"Senha",
        aoClick: changePassword,
        err: errorPassword
    }
    ]



  return (

    <div className={styles.settings} id='profile'>
        <h1 className={styles.settings__title}>Configurações</h1>
        
        <div className={styles.settings__container}> 
            <div className={styles.settings__container__listTextField}>
                {listTextField.map(item => <ChangeTextField
                type={item.type}
                placeholder ={item.placeholder}
                id = {item.id}
                fieldName={item.fieldName}
                aoClick={item.aoClick}
                err={item.err}
                key={`Change Text Field ${item.fieldName}`
            }
                />
                )}
            </div>

            <div className={styles.settings__container__edit_photo}>
                <label>
                    Imagem do Perfil
                </label>
                <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${auth.user?.username}`} ></img>
                <div className={styles.settings__container__edit_photo__camera_sobre_a_foto}>
                    <div>
                        <CameraSvg/>
                    </div>
                </div>
                
            </div>
        </div>

        <div className={styles.settings__delete_account}>
            <h2>Deletar conta</h2>
            <hr></hr>
            <p>
            Ao deletar sua conta todas suas informações
            serão removidas do nosso site para sempre. 
            </p>
            <button onClick={deleteAccount}>
                <div>
                    <DeletePersonSvg/>
                </div>
                
                    Deletar conta
                
            </button>
        </div>



    </div>

  )
}
