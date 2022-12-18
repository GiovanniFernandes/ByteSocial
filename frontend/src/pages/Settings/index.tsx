import { useApiAuth } from 'hooks/useApiAuth';
import { useState, useEffect } from 'react';
import { CameraSvg } from './assets/CameraSVG';
import { DeletePersonSvg } from './assets/DeletePersonSvg';
import { ChangeTextField } from './ChangeTextField';

import styles from './Settings.module.scss'

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

const listTextField = [
    {
        type: "text",
        placeholder:"Nome de usuário",
        id:"NomeDeUsuario",
        fieldName:"Nome",
    },
    {
        type: "email",
        placeholder:"email@email",
        id:"email",
        fieldName:"Email",
    },
    {
        type: "password",
        placeholder:"*****************",
        id:"password",
        fieldName:"Senha",
    }
]



export default function Settings(props: Props) {

  useEffect(() => {
    props.setSelectedMenu(3)
  }, [])


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
                key={`Change Text Field ${item.fieldName}`}
                />
                )}
            </div>

            <div className={styles.settings__container__edit_photo}>
                <label>
                    Imagem do Perfil
                </label>
                
                <img src='https://3.bp.blogspot.com/-1ZtNZ0lkJ_Q/WrJ-ua2ZUeI/AAAAAAAAK2k/vI_Q5lCwnu0StekAyVv7RIUGz0iBORHqwCEwYBhgL/s1600/AngelinaJolie.jpg'></img>
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
            <button>
                <div>
                    <DeletePersonSvg/>
                </div>
                
                    Deletar conta
                
            </button>
        </div>



    </div>

  )
}
