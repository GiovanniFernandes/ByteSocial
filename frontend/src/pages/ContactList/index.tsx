import styles from './ContactList.module.scss'
import Menu from '../../components/Menu'
import { useState } from 'react'


export default function ContactList(){

    const [selectedSection, setSelectedSection] = useState<number>(0)

    return( //perguntar pq tudo tem que estar dentro do "title"
    
    <div className={styles.principal}>
      <Menu selectedMenu={0} />
      
      <div className={styles.principal__title}> 
        <h1>Mensagens</h1>
      </div> 
    
      <div className={styles.principal__sections}>
        <div
          className={selectedSection !== 0 ? styles.principal__sections__item : styles.principal__sections__item__selected}
          onClick={() => setSelectedSection(0)}>
          <h3>Conversas</h3>
        </div>
        
        <div
          className={selectedSection !== 1 ? styles.principal__sections__item : styles.principal__sections__item__selected}
          onClick={() => setSelectedSection(1)}>
          <h3>Lista de contatos</h3>
        </div>    
      </div>
      
      <div className={styles.principal__search}>
        <input type="text" placeholder='Buscar conversa' className={styles.principal__input} />
      </div>
  </div>//Principal
  
    )
}