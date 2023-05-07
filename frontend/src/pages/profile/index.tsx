import { useState, useEffect } from 'react';
import styles from './Profile.module.scss'
import { useContext } from 'react';
import { AuthContext } from 'contexts/Auth/AuthContexts'
import NewPost from 'components/NewPost';
import { tPost } from 'types/Post';
import { NavLink } from 'react-router-dom';
import { useApiUser } from 'hooks/useApiUser';
import { _userProfile } from '../../types/userProfile'
import Post from 'components/Post/Post';
import RequestConnection from 'components/RequestConnection';
import { useApiRequest } from 'hooks/useApiRequest';

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

type request = {
  id: number,
  username: string,
  email: string
}





const LIMIT = 10;




export default function Profile(props: Props) {

  const auth = useContext(AuthContext); 

  const [username, setUsername] = useState<string | null>('')

  const [selectedSection, setSelectedSection] = useState<number>(0)

  const [offset, setOffset] = useState<number>(0)
  
  const [changeProfile, setChangeProfile] = useState<boolean>(false);
  const [listPost, setListPost] = useState<tPost[]>([]);
  const [amountPosts, setAmountPosts] = useState<number>(1)

  const [amountConnections, setAmountConnections] = useState<number>(0)
  const [amountRequestsReceived, setAmountRequestsReceived] = useState<number>(0)

  const [listResquest, setListRequest] = useState<request[]>([])

  const apiUser = useApiUser();
  const apiConnection = useApiRequest();


  useEffect(() => {
    getUser();
    props.setSelectedMenu(2)
  }, [])

  useEffect(() => {
    setChangeProfile(false);
    effectToPosts();
  }, [changeProfile])
  
  const effectToPosts = async () => {

    const data:_userProfile = await apiUser.getMyProfile(offset, LIMIT)
    
    setListPost(data.list);

    setAmountPosts(data.count);
    setAmountConnections(data.connections);
    setAmountRequestsReceived(data.requests);

  }

  const clickSectionSolicitaçõesConexão = async () => {
    setSelectedSection(1);

    const data:request[] = await apiConnection.showRequests();
    setListRequest(data);
  }



  const interactions = [
    {
      "title": "posts",
      "count": amountPosts
    },
    {
      "title": "respostas",
      "count": amountPosts*3
    },
    {
      "title": "conexões",
      "count": amountConnections
    },
    {
      "title": "solicitações",
      "count": amountRequestsReceived
    }
  ]


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
      <NewPost change={setChangeProfile} />
      <div className={styles.profile__sections}>
        <div
          className={selectedSection !== 0 ? styles.profile__sections__item : styles.profile__sections__item__selected}
          onClick={() => setSelectedSection(0)}>
          <h3>Suas publicações</h3>
        </div>
        <div
          className={selectedSection !== 1 ? styles.profile__sections__item : styles.profile__sections__item__selected}
          onClick={() => clickSectionSolicitaçõesConexão()}>
          <h3>Solicitações de conexão</h3>
        </div>
      </div>
      {
        (selectedSection === 0) ? 
          
        <div className={styles.profile__list}>
          {listPost.map(e => <Post
          id ={ e.postId }
          username={e.postUsername}
          conteudo={e.postContent}
          curtidas={e.postTotalLikes}
          comentario={e.postTotalLikes*5}
          liked={e.userLiked}
          dataPostagem={e.postDate}
          userId={e.postUserId}
          setRefresh={setChangeProfile}
          key={`postMyProfile${e.postId}`
          } 

        ></Post>)}
        
          </div>
          :
          <div className={styles.profile__list}>
            {(listResquest.length > 0)? listResquest.map(e => <RequestConnection 
                user_id={e.id}
                email={e.email}
                username={e.username}
                changeListRequest={clickSectionSolicitaçõesConexão}
                changeInteractions={effectToPosts}
                key={e.id}
            />)
              : <h4 style={{marginLeft: '1vh'}}>Sem solicitações de amizade no momento</h4>
            }


          </div>
      }
      
    </div>

  )
}
