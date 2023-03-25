import styles from './ChatList.module.scss'
import Menu from '../../components/Menu'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'



interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

interface Contact {
  username: string;
}

const list: Contact[] = [
  {
    username: 'Terencio'
  },
  {
    username: 'Isabele'
  },
  {
    username: 'Bianca'
  },
  {
    username: 'Terencio'
  },
  {
    username: 'Isabele'
  },
  {
    username: 'Bianca'
  }
];


export default function ContactList(props: Props){
  const [search, setSearch] = useState('')

  const lowerSearch = search.toLowerCase()

  const contactsFilter = list.filter((item: Contact) => item.username.toLowerCase().includes(lowerSearch));
  
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
    
    <div className={styles.chatListPrincipal}>
        <Menu selectedMenu={0} />
        <div className={styles.chatListPrincipal__page}>
          <div className={styles.chatListPrincipal__title}> 
            <h1>Mensagens</h1>
          </div> 
        
          <div className={styles.chatListPrincipal__top}>
            <div className={styles.chatListPrincipal__sections}>
              <div className={selectedSection !== 0 ? styles.chatListPrincipal__sections__item : styles.chatListPrincipal__sections__item__selected}
              onClick={() => setSelectedSection(1)}>
                <h3>Conversas</h3>
              </div>
              
              <div className={selectedSection !== 1 ? styles.chatListPrincipal__sections__item : styles.chatListPrincipal__sections__item__selected}
              onClick={() => setSelectedSection(0)}>
                <h3>Lista de contatos</h3>
              </div>
            </div>

            <div className={styles.chatListPrincipal__inputBox}>
              <input  
              type="text" 
              placeholder='Buscar conversa' 
              className={styles.chatListPrincipal__input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch size="20px" className={styles.chatListPrincipal__searchButton}/>
            </div>

          </div>
          
          <div className={styles.chatListPrincipal__contactList}>
            <ul className={styles.chatListPrincipal__contactList__list}>
              {contactsFilter.map((item) => 
                <li className={styles.chatListPrincipal__contactList__contact}>
                
                  
                  <div className={styles.chatListPrincipal__contactList__contactPhoto}>

                    <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${item.username}`}/>
                  </div>
                  <div className={styles.chatListPrincipal__contactList__contactText}>
                    <h2 className={styles.chatListPrincipal__contactList__userName}>{item.username}</h2>
                    <p className={styles.chatListPrincipal__contactList__userMsg}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                </li>
                )}
            </ul>
          </div>

        </div>
      </div>//Principal
  
    )
}