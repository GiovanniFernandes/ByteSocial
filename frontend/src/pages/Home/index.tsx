import { useEffect, useState } from "react"
import styles from './Home.module.scss';
import Post from "components/Post/Post";
import NewPost from "components/NewPost";
import { useApiPost } from "hooks/useApiPost";
import { tPost, aboutPosts } from "types/Post";
import {useSearchParams} from 'react-router-dom'

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}


export default function Home(props: Props) {

  const [selectedSection, setSelectedSection] = useState<number>(0);
  const [changeListPost, setChangeListPost] = useState<boolean>(false);
  const [listPost, setListPost] = useState<tPost[]>([]);
  const [count, setCount] = useState<number>(1)
  const [searchParams, setSearchParams] = useSearchParams({});

  const apiPost = useApiPost();

  useEffect(() => {
    props.setSelectedMenu(1)
  }, [])

  useEffect(() => {
    setChangeListPost(false);
    effectToPosts();
  }, [changeListPost])
//   const handlePaginationChange = (_, value) => {
//     // cria uma cópia do objeto searchParams
//     const newSearchParams = new URLSearchParams(searchParams);
//     // adiciona o novo valor de página à cópia
//     newSearchParams.set("page", value);
//     // atualiza o estado com a cópia
//     setSearchParams(newSearchParams);
// };
  
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
          username={e.postUsername}
          conteudo={e.postContent}
          curtidas={5}
          comentario={10}
          dataPostagem={e.postDate}
          userId={e.postUserId}
          key={`postHome${e.postId}`}
        ></Post>)}
        
      </div>
      <div>
      {/* <Pagination
                    className='mb-16'
                    color='primary'
                    size='large'
                    shape='rounded'
                    defaultPage={1}
                    page={parseInt(page)}
                    count={Math.ceil(totalCount/6)} //Math.ceil(apartments.length / 6)
                    onChange={handlePaginationChange}
                /> */}
      </div>
    </div>
  ) 
}
