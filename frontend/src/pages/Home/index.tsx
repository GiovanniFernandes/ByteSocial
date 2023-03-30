import { useEffect, useState } from "react"
import styles from './Home.module.scss';
import { IoMdSend } from 'react-icons/io'
import posts from 'data/posts.json'
import Post from "components/Post/Post";


// import { useContext } from 'react';
// import { AuthContext } from 'contexts/Auth/AuthContexts'

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}


export default function Home(props: Props) {

  const [selectedSection, setSelectedSection] = useState<number>(0);
  // const [username, setUsername] = useState<string | null>('');const auth = useContext(AuthContext); 
    
  useEffect(() => {
    // getUser();
    props.setSelectedMenu(1)
  }, [])
  
  // const getUser = async () => {
  //   if(auth.user != null)
  //       setUsername(auth.user.username)
  //     else
  //       setUsername("")
  // }
    



  return (
    <div className={styles.Home} id='Home'>
      <div className={styles.Home__newPost}>
        <textarea className={styles.Home__newPost__input} placeholder='O que você está pensando?' rows={1} />
        <IoMdSend
          className={styles.Home__newPost__send}
          size={30}
          color='#52A3FF'
        />
      </div>
      <div className={styles.Home__sections}>
        <div
          className={selectedSection !== 0 ? styles.Home__sections__item : styles.Home__sections__item__selected}
          onClick={() => setSelectedSection(0)}>
          <h3>Publicações</h3>
        </div>
      </div>
      <div className={styles.Home__FeedPosts}>
        {posts.map(e => <Post
          username={e.username}
          conteudo={e.conteudo}
          curtidas={e.curtidas}
          comentario={e.comentario}
          dataPostagem={e.dataPostagem}
          key={`postHome${e.id}`}
        ></Post>)}
        
      </div>
      <div>
        <h2>Aqui vai o componente de paginação</h2>
      </div>
    </div>
  ) 
}
