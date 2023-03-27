import { useEffect, useState } from "react"
import styles from './Home.module.scss';
import Post from '../../components/Post/Post'
import { IoMdSend } from 'react-icons/io'
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
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
      <div>
        <h2>Aqui vai o componente de paginação</h2>
      </div>
    </div>
  ) 
}
