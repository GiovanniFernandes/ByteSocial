import { useEffect, useState } from "react"
import styles from './Home.module.scss';
import posts from 'data/posts.json'
import Post from "components/Post/Post";
import NewPost from "components/NewPost";

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}


export default function Home(props: Props) {

  const [selectedSection, setSelectedSection] = useState<number>(0);
    
  useEffect(() => {
    props.setSelectedMenu(1)
  }, [])
  
  return (
    <div className={styles.Home} id='Home'>
      <div className={styles.Home__newPost}>
        <NewPost/>
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
