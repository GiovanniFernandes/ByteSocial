import styles from './ContactList.module.scss'
import Menu from '../../components/Menu'
import { useContext, useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { AuthContext } from 'contexts/Auth/AuthContexts'


export default function ContactList(){

    const [selectedSection, setSelectedSection] = useState<number>(0)
    const [contactname, setContactname] = useState<string | null >('')
    const auth = useContext(AuthContext)

    const getContact = async () => {
      
  }

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
              <input type="text" placeholder='Buscar conversa' className={styles.principal__input}/>
            </div>

            <div className={styles.principal__searchButton}>
              <FiSearch/>
            </div>
          </div>
          
          <div className={styles.contactList}>
            <ul className={styles.contactList__list}>
              <li>
                <button className={styles.contactList__ContactButton}></button>
              </li>
            </ul>
          </div>

        </div>
      </div>//Principal
  
    )
}