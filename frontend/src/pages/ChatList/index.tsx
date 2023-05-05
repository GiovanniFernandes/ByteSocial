import styles from './ChatList.module.scss'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

interface Contact {
  username: string,
  id:string
}

export default function ContactList(props: Props){
  const [search, setSearch] = useState('')
  const [list, setList] = useState<Array<Contact>>([]);

  const lowerSearch = search.toLowerCase()

  const contactsFilter = list.filter((item: Contact) => item.username.toLowerCase().includes(lowerSearch));
  

    useEffect(() => {
      props.setSelectedMenu(3)

      async function getContacts(){
        const contact = await axios.get<Array<Contact>>("http://localhost:5000/contact");
        setList(contact.data);
      }
      getContacts()
    }, [])

    const navigate = useNavigate();

    return (
      <div className={styles.chatListPrincipal}>
        <div className={styles.chatListPrincipal__page}>
          <div className={styles.chatListPrincipal__title}>
            <h1>Mensagens</h1>
          </div>
  
          <div className={styles.chatListPrincipal__top}>
            <div className={styles.chatListPrincipal__sections}>
              <div className={styles.chatListPrincipal__sections__item__selected}>
                <a>Conversas</a>
              </div>
  
              <div className={styles.chatListPrincipal__sections__item}>
                <a onClick={() => navigate('/contactList')}>Contatos</a>
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
              <FiSearch size="20px" className={styles.chatListPrincipal__searchButton} />
            </div>
  
          </div>
  
          <div className={styles.chatListPrincipal__contactList}>
            <ul className={styles.chatListPrincipal__contactList__list}>
              {contactsFilter.map((item) =>
                <li
                  key={`chatList:${item.id}`}
                  className={styles.chatListPrincipal__contactList__contact}
                  onClick={() => navigate(`/chat/${item.id}/${item.username}`)}
                >
                  <div className={styles.chatListPrincipal__contactList__contactPhoto}>
                    <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${item.username}`} alt={`${item.username} avatar`} />
                  </div>
                  <div className={styles.chatListPrincipal__contactList__contactText}>
                    <h2 className={styles.chatListPrincipal__contactList__userName}>{item.username}</h2>
                    <p className={styles.chatListPrincipal__contactList__userMsg}>Lorem ipsum dolor sit amet consectetur adipisicing elit vasco</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
  
        </div>
      </div>
    )
}