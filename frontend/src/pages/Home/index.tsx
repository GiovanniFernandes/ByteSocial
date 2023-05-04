import { useEffect, useState } from "react"
import styles from './Home.module.scss';
import Post from "components/Post/Post";
import NewPost from "components/NewPost";
import { useApiPost } from "hooks/useApiPost";
import { tPost, aboutPosts } from "types/Post";

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}


export default function Home(props: Props) {

  const [selectedSection, setSelectedSection] = useState<number>(0);
  const [changeListPost, setChangeListPost] = useState<boolean>(false);
  const [listPost, setListPost] = useState<tPost[]>([]);
  const [count, setCount] = useState<number>(1)


  const apiPost = useApiPost();

  useEffect(() => {
    props.setSelectedMenu(1)
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

  
  return (
    <div className={styles.Home} id='Home'>
      <div className={styles.Home__newPost}>
        <NewPost change={setChangeListPost}/>
      </div>
      <div className={styles.Home__sections}>
        <div
          className={selectedSection !== 0 ? styles.Home__sections__item : styles.Home__sections__item__selected}
          onClick={() => setSelectedSection(0)}>
          <h3>Publicações</h3>
        </div>
      </div>
      <div className={styles.Home__FeedPosts}>
        {listPost.map(e => <Post
          
          id ={ e.postId }
          username={e.postUsername}
          conteudo={e.postContent}
          curtidas={e.postTotalLikes}
          comentario={e.postTotalLikes*5}
          dataPostagem={e.postDate}
          userId={e.postUserId}
          liked={e.userLiked}
          setRefresh={setChangeListPost}
          key={`postHome${e.postId}`}


        ></Post>)}
        
      </div>
      <div>

      </div>
    </div>
  ) 
}
