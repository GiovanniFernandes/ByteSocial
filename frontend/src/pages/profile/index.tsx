import { useState, useEffect } from 'react';
import styles from './Profile.module.scss'
import interactions from 'data/interactions.json'
import { useContext } from 'react';
import { AuthContext } from 'contexts/Auth/AuthContexts'
import NewPost from 'components/NewPost';
import { tPost } from 'types/Post';
import { NavLink } from 'react-router-dom';
import { useApiUser } from 'hooks/useApiUser';

import { _userProfile } from '../../types/userProfile'
import Post from 'components/Post/Post';
import RequestConnection from 'components/RequestConnection';

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

const LIMIT = 2;


const listResquest = [

  {
    user_id: 10,
    email: "xuxa@soparabaixinhos.com",
    username: "xuxa"
  },
  {
    user_id: 11,
    email: "Sasha@soparabaixinhos.com",
    username: "Sasha"
  },
  {
    user_id: 12,
    email: "zoro@reidoinferno.com",
    username: "zoro"
  }

]








export default function Profile(props: Props) {

  const auth = useContext(AuthContext); 

  const [username, setUsername] = useState<string | null>('')

  const [selectedSection, setSelectedSection] = useState<number>(0)



  const [changeListPost, setChangeListPost] = useState<boolean>(false);

  const [offset, setOffset] = useState<number>(0)


  const [listPost, setListPost] = useState<tPost[]>([]);
  
  
  const [count, setCount] = useState<number>(1)
  

  const apiUser = useApiUser();



  useEffect(() => {
    getUser();
    props.setSelectedMenu(2)
  }, [])

  useEffect(() => {
    setChangeListPost(false);
    effectToPosts();
  }, [changeListPost])
  
  const effectToPosts = async () => {

    const data:_userProfile = await apiUser.getMyProfile(offset, LIMIT)
  
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
          <NavLink to="/settings" className={styles.profile__user__edit}>Editar perfil</NavLink>
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
      {
        (selectedSection === 0) ? 
          
        <div className={styles.Home__FeedPosts}>
        {listPost.map(e => <Post
          username={e.postUsername}
          conteudo={e.postContent}
          curtidas={5}
          comentario={10}
          dataPostagem={e.postDate}
          userId={e.postUserId}
          key={`postMyProfile${e.postId}`
          } 

        ></Post>)}
        
          </div>
          :
          <div>
            {
              listResquest.map(e => <RequestConnection 
                user_id={e.user_id}
                email={e.email}
                username={e.username}
              />)
            }


          </div>

      

      }
      
      
      
      




    </div>

  )
}

/*
[
  {
    username: xuxa,

    
  }
]



*/