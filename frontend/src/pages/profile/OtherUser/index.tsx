import { useEffect, useState } from "react";
import styles from './OtherUser.module.scss'
import { useContext } from 'react';
import { AuthContext } from 'contexts/Auth/AuthContexts'
import {BsFillPersonPlusFill} from 'react-icons/bs'
interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

const interactions = [
  {
    "title": "posts",
    "count": 20
  },
  {
    "title": "respostas",
    "count": 50
  },
  {
    "title": "conexões",
    "count": 50
  }
]


export default function OtherUser(props: Props) {


    useEffect(() => {
        getUser()
        props.setSelectedMenu(1)
    }, [])
    const auth = useContext(AuthContext); 
    const [username, setUsername] = useState<string | null>('')
    const getUser = async () => {
      if(auth.user != null)
          setUsername(auth.user.username) 
        else 
          setUsername("")
    }

  return (
    <div className={styles.profile} id='profile'>
      <h1 className={styles.profile__Title}> Perfil </h1>
      <div className={styles.profile__OtherUser}>
        <div className={styles.profile__OtherUser__pic}>
         <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${username}`} alt="Foto de perfil" className={styles.profile__OtherUser__pic} /> 
        </div>
        <div className={styles.profile__OtherUser__infos}>
          <h2 className={styles.profile__OtherUser__name}>{username}</h2>
          <button className={styles.profile__OtherUser__connect}>
            <BsFillPersonPlusFill
              className={styles.profile__OtherUser__connect__icon}
              size={20}
            />
            <h3 className={styles.profile__OtherUser__connect__text}>Conectar-se</h3>
            
          </button>
          
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
      <div className={styles.profile__sectionPosts}>    
        <div className={styles.profile__sectionPosts_title}>
          <h3>Publicações</h3>
        </div>
        
        Xuxa
      </div>
    </div>
  ) 
}
