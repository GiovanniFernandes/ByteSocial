import styles from './ContactList.module.scss'
import Menu from '../../components/Menu'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'




interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

interface Contact {
  username: string,
  id:string
}

const list: Contact[] = [
  {
    id: "1",
    username: 'Terencio'
  },
  {
    id: "2",
    username: 'Isabele'
  },
  {
    id: "3",
    username: 'Bianca'
  },
  {
    id: "4",
    username: 'Terencio'
  },
  {
    id: "5",
    username: 'Isabele'
  },
  {
    id: "6",
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

    const navigate = useNavigate();


    return( 
    
    <div className={styles.contactListPrincipal}>
        <div className={styles.contactListPrincipal__page}>
          <div className={styles.contactListPrincipal__title}> 
            <h1>Mensagens</h1>
          </div> 
        
          <div className={styles.contactListPrincipal__top}>
            <div className={styles.contactListPrincipal__sections}>
              <div className={styles.contactListPrincipal__sections__item}>
                <a onClick={() => navigate('/chatList')}>Conversas</a>
              </div>
              
              <div className={styles.contactListPrincipal__sections__item__selected}>
                <a>Lista de contatos</a>
              </div>
            </div>

            <div className={styles.contactListPrincipal__inputBox}>
              <input  
              type="text" 
              placeholder='Buscar contato' 
              className={styles.contactListPrincipal__input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch size="20px" className={styles.contactListPrincipal__searchButton}/>
            </div>

          </div>
          
          <div className={styles.contactListPrincipal__contactList}>
            <ul className={styles.contactListPrincipal__contactList__list}>
              {contactsFilter.map((item) =>  <li key={`ContactList:${item.id}`}
                  className={styles.contactListPrincipal__contactList__contact}>
                
                  
                  <div className={styles.contactListPrincipal__contactList__contactPhoto}>

                    <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${item.username}`}/>
                  </div>

                  <h2 className={styles.contactListPrincipal__contactList__userName}>{item.username}</h2>
                  
                
              </li>
                )}
              
            </ul>
          </div>

        </div>
      </div>//Principal
  
    )
}