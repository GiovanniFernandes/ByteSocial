import NewPost from "components/NewPost"
import { useEffect } from "react"
import styles from './Home.module.scss'

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}


export default function Home(props: Props) {


    useEffect(() => {
        props.setSelectedMenu(1)
    }, [])


  return (
    <div className={styles.home}>
      <div className={styles.home__newPost}>
        <NewPost/>
      </div>
      <div className={styles.home__posts}>
        <div className={styles.home__posts__subtitle}>
        </div>
        <div className={styles.home__posts__feed}>

        </div>
      </div>
      
    </div>
  )
}
