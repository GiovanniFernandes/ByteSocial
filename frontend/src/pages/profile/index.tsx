import Menu from 'components/Menu';
import { useApiAuth } from 'hooks/useApiAuth';
import { useState, useEffect } from 'react';
import styles from './Profile.module.scss'
import interactions from 'data/interactions.json'

export default function Profile() {

  const apiAuth = useApiAuth()
  const [username, setUsername] = useState<string>('')

  useEffect(()=>{
    getUser();
  },[])

  const getUser = async () => {
      const response = await apiAuth.authGet();
      setUsername(response[0].username)
  }

  return(
    <div className={styles.container}>
    <Menu selectedPage={2} />
    <div className={styles.profile} id='profile'>
      <h1 className={styles.profile__title}>Seu Perfil</h1>
      <div className={styles.profile__user}>
        <div className={styles.profile__user__pic}>
          <img src="/assets/default_profile_picture.svg" alt="Foto de perfil" className={styles.profile__user__pic}/>
        </div>
        <div className={styles.profile__user__infos}>
          <h2 className={styles.profile__user__name}>{username}</h2>
          <a href="#profile" className={styles.profile__user__edit}>Editar perfil</a>
          <ul className={styles.profile__user__interactions}>
            {interactions.map((item) => (
              <li className={styles.profile__user__interaction}>
                <p className={styles.profile__user__interaction__count}>{item.count}</p>
                <p className={styles.profile__user__interaction__title}>{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <input type="text" className={styles.profile__newPost} placeholder='O que você está pensando?' />
    </div>
    </div>
  )
}