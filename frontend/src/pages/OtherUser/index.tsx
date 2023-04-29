import { useEffect, useState } from "react";
import styles from './OtherUser.module.scss'
import { useParams } from "react-router-dom";
import { useApiUser } from "hooks/useApiUser";
import { _userProfile } from "types/userProfile";
import { tPost } from "types/Post";
import Post from "components/Post/Post";
import { ConnectionButton } from "components/ConnectionButton";
import { eStateConnections } from "types/eStateConnections";

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

export default function OtherUser(props: Props) {
  
  const { postUserId } = useParams();
  const apiUser = useApiUser();

  const [username, setUsername] = useState<string | null>('')
  const [listPost, setListPost] = useState<tPost[]>([]);
  const [amountPosts, setAmountPosts] = useState<number>(0)
  
  const [amountConnections, setAmountConnections] = useState<number>(0)

  
  const [aboutConnetion, setAboutConnection] = useState<eStateConnections>(eStateConnections.noConnection)
  


  useEffect(() => {
    props.setSelectedMenu(1)
    getUser()
  }, [])
  
  const getUser = async () => {
    if (postUserId === undefined) return
    const userProfile: _userProfile = await apiUser.getUserProfile(postUserId, 0);  
    
    setUsername(userProfile.username)
    setListPost(userProfile.list)
    setAmountPosts(userProfile.count)
    setAmountConnections(userProfile.connections)
  }

  const interactions = [
    {
      "title": "posts",
      "count": amountPosts
    },
    {
      "title": "respostas",
      "count": amountPosts * 3
    },
    {
      "title": "conexões",
      "count": amountConnections
    }
  ]


    
  return (
    <div className={styles.profile} id='profile'>
      <h1 className={styles.profile__Title}> Perfil </h1>
      <div className={styles.profile__OtherUser}>
        <div className={styles.profile__OtherUser__pic}>
         <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${username}`} alt="Foto de perfil" className={styles.profile__OtherUser__pic} /> 
        </div>
        <div className={styles.profile__OtherUser__infos}>
          <h2 className={styles.profile__OtherUser__name}>{username}</h2>
          <ConnectionButton aboutConnetion={aboutConnetion}/>

          <ul className={styles.profile__OtherUser__interactions}>
              {interactions.map((item) => (
                <li key={`interactions${item.title}`}className={styles.profile__OtherUser__interaction}>
                  <p className={styles.profile__OtherUser__interaction__count}>{item.count}</p> 
                  {/* Fazer uma validação se os numeros forem muito altos, e colocar no lugar 10k+, algo do genero*/}
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
        <div className={styles.profile__sectionPosts_FeedPosts}>
          {listPost.map(e => <Post
          username={e.postUsername}
          conteudo={e.postContent}
          curtidas={5}
          comentario={10}
          dataPostagem={e.postDate}
          userId={e.postUserId}
          key={`postOtherUser${e.postId}`}
          ></Post>)}
      </div>
      <div>
        <h2>Aqui vai o componente de paginação{`count == ${amountPosts}`}</h2>
      </div>
      </div>
    </div>
  ) 
}


