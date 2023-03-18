import styles from './ContactList.module.scss'
import Menu from '../../components/Menu'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'



interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

const list = [
  {
    "username": "Terencio",
  },
  {
    "username": "Bianca",
  },
  {
    "username": "Isabele",
  },
  {
    "username": "Terencio",
  },
  {
    "username": "Bianca",
  },
  {
    "username": "Isabele",
  },
]


export default function ContactList(props: Props){

    /*const apiUser = useApiUser();
    const auth = useContext(AuthContext);*/
  
    const [selectedSection, setSelectedSection] = useState<number>(0)
  
    //const [contactname, setContactname] = useState<string | null >('')

    useEffect(() => {
      props.setSelectedMenu(3)
    }, [])

  
    /*const getContact = async () => {
      
    }*/ 

    return( 
    
    <div className={styles.principal}>
        <Menu selectedMenu={0} />
        <div className={styles.principal__page}>
          <div className={styles.principal__title}> 
            <h1>Mensagens</h1>
          </div> 
        
          <div className={styles.principal__top}>
            <div className={styles.principal__sections}>
              <div className={selectedSection !== 1 ? styles.principal__sections__item : styles.principal__sections__item__selected}
              onClick={() => setSelectedSection(1)}>
                <h3>Conversas</h3>
              </div>
              
              <div className={selectedSection !== 0 ? styles.principal__sections__item : styles.principal__sections__item__selected}
              onClick={() => setSelectedSection(0)}>
                <h3>Lista de contatos</h3>
              </div>
            </div>

            <div className={styles.principal__inputBox}>
              <input  type="text" placeholder='Buscar contato' className={styles.principal__input}/>
              <FiSearch size="20px" className={styles.principal__searchButton}/>
            </div>

          </div>
          
          <div className={styles.principal__contactList}>
            <ul className={styles.principal__contactList__list}>
              {list.map(item => 
                <li className={styles.principal__contactList__contact}>
                
                  
                  <div className={styles.principal__contactList__contactPhoto}>

                    <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${item.username}`} alt={item.username} />
                  </div>

                  <p className={styles.principal__contactList__userName}>{item.username}</p>
                  
                
              </li>
                )}
              
            </ul>
          </div>

        </div>
      </div>//Principal
  
    )
}