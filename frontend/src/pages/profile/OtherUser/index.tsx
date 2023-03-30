import { useEffect, useState } from "react"
import styles from './OtherUser.module.scss'
import Post from '../../../components/Post/Post'
import interactions from 'data/interactions.json'
import { useContext } from 'react';
import { AuthContext } from 'contexts/Auth/AuthContexts'
import {UserPlus} from 'phosphor-react'

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}


export default function Home(props: Props) {


    useEffect(() => {
        getUser()
        props.setSelectedMenu(1)
    }, [])
    const auth = useContext(AuthContext); 
    const [username, setUsername] = useState<string | null>('')
    const [selectedSection, setSelectedSection] = useState<number>(0)
    const getUser = async () => {
      if(auth.user != null)
          setUsername(auth.user.username) 
        else 
          setUsername("")
    }

  return (
    <div className={styles.profileID} id='profile'>
      <h1 className={styles.profile__Title}> Perfil </h1>
      <div className={styles.profile__OtherUser}>
        <div className={styles.profile__OtherUser__img}>
         <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${username}`} alt="Foto de perfil" className={styles.profile__OtherUser__img} /> 
        </div>
        <div className={styles.profile__OtherUser__infos}>
        {/* //aqui vai o ícone que tem no figma */}
          <h2 className={styles.profile__OtherUser__name}>{username}</h2>
          <div className={styles.profile__OtherUser__connect}>
            <UserPlus className={styles.profile__OtherUser__connect__icon} size={20}  />
            <h3 className={styles.profile__OtherUser__connect__text}>Conectar-se</h3>
            
          </div>
          
          <ul className={styles.profile__OtherUser__interactions}>
              {interactions.map((item) => (
                <li key={`interactions${item.title}`}className={styles.profile__OtherUser__interaction}>
                  <p className={styles.profile__OtherUser__interaction__count}>{item.count}</p>
                  <p className={styles.profile__OtherUser__interaction__title}>{item.title}</p>
                 
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={styles.profile__sections}>
        <div
            className={selectedSection !== 0 ? styles.profile__sections__item : styles.profile__sections__item__selected}
            onClick={() => setSelectedSection(0)}>
            <h3>Publicações</h3>
        </div>
        Xuxa
      </div>
    </div>
  ) 
}
