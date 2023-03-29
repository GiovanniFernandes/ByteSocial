import styles from './Post.module.scss' ;
import {useState, useContext, useEffect} from 'react';
import { AuthContext } from 'contexts/Auth/AuthContexts'
import {Heart, ChatCircle} from 'phosphor-react'
 

export default function Post(){
  const [username, setUsername] = useState<string | null>('')
  
  const auth = useContext(AuthContext);
  useEffect(() => {
    getUser();

  }, [])
  const getUser = async() =>{
    if(auth.user != null)
      setUsername(auth.user.username)
      else
        setUsername("")
  }
  return(
    <div className={styles.Post__content}>
          <div className={styles.Post__content__user}>
            <div className={styles.Post__content__user__img}>
                <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${username}`} alt="Foto de perfil" className={styles.Post__content__user__img} />
              </div>
              <div className={styles.Post__content__user__userInfo}>
                <a href='otheruser'className={styles.Post__content__user__userInfo__name}>{username}</a>
                <p className={styles.Post__content__user__userInfo__PostDate}>31 de mar 2022 às 21h</p>
              </div>
          </div>
            
            <div className={styles.Post__content__text}>
              <p>Eu estou colocando qualquer coisa, pois perdi a extensão que colocava loren ipsum pra mim, Boa sorte galera!</p>
            </div>
            <div className={styles.Post__content__icons}>
              <div className={styles.Post__content__icons__Like}>
                <div className={styles.Post__content__icons__LikeContainer}>
                  <Heart size={16} className={styles.Post__content__icons__Like__LikeContainer__svg} color="#FFFFFF" />
                  <p className={styles.Post__content__icons__Like__LikeContainer__text}>11</p>
                </div>
              </div>
              <div className={styles.Post__content__icons__Comment}>
                <ChatCircle size={16} color="#0068DF" />
                <p>0</p>
              </div>
            </div>

        </div>
  ) 
}