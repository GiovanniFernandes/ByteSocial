import { useState, useEffect } from 'react';
import styles from './Profile.module.scss'
import interactions from 'data/interactions.json'
import { useContext } from 'react';
import { AuthContext } from 'contexts/Auth/AuthContexts'
import NewPost from 'components/NewPost';
import { useApiPost } from 'hooks/useApiPost';
import { tPost, aboutPosts } from 'types/Post';
interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

export default function Profile(props: Props) {

  const auth = useContext(AuthContext); 
  const [username, setUsername] = useState<string | null>('')
  const [selectedSection, setSelectedSection] = useState<number>(0)
  const [changeListPost, setChangeListPost] = useState<boolean>(false);
  const [ , setListPost] = useState<tPost[]>([]);
  const [ , setCount] = useState<number>(1)

  const apiPost = useApiPost();


  useEffect(() => {
    getUser();
    props.setSelectedMenu(2)
  }, [])

  useEffect(() => {
    setChangeListPost(false);
    effectToPosts();
  }, [changeListPost])
  
  const effectToPosts = async () => {
    const data: aboutPosts = await apiPost.showPosts(0);
    setCount(data.count);
    setListPost(data.list);
  }

  const getUser = async () => {
    if(auth.user != null)
        setUsername(auth.user.username) 
      else 
        setUsername("")
  }

  return (

    <div className={styles.profile} id='profile'>
      <h1 className={styles.profile__title}>Seu Perfil</h1>
      <div className={styles.profile__user}>
        <div className={styles.profile__user__pic}>
          <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${username}`} alt="Foto de perfil" className={styles.profile__user__pic} />
        </div>
        <div className={styles.profile__user__infos}>
          <h2 className={styles.profile__user__name}>{username}</h2>
          <a href="#profile" className={styles.profile__user__edit}>Editar perfil</a>
          <ul className={styles.profile__user__interactions}>
            {interactions.map((item) => (
              <li key={`interactions${item.title}`}className={styles.profile__user__interaction}>
                <p className={styles.profile__user__interaction__count}>{item.count}</p>
                <p className={styles.profile__user__interaction__title}>{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <NewPost change={setChangeListPost} />
      <div className={styles.profile__sections}>
        <div
          className={selectedSection !== 0 ? styles.profile__sections__item : styles.profile__sections__item__selected}
          onClick={() => setSelectedSection(0)}>
          <h3>Suas publicações</h3>
        </div>
        <div
          className={selectedSection !== 1 ? styles.profile__sections__item : styles.profile__sections__item__selected}
          onClick={() => setSelectedSection(1)}>
          <h3>Solicitações de conexão</h3>
        </div>
      </div>
    </div>

  )
}
