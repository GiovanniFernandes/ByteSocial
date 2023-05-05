import React, { useState, useEffect, useRef } from 'react';
import styles from "./Chat.module.scss";
import { FaChevronLeft, FaList, FaArrowRight, FaNpm } from 'react-icons/fa';
import io from 'socket.io-client';
import axios from "axios";
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:3000'); //colocar a porta do backend


interface IMessage {
  id: number;
  content: string;
  timestamp: string;
  senderName: string;
}

interface Contact {
  username: string,
  id:string
}

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}


export default function Chat(props: Props) {
  const [inputText, setInputText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]); // adicionado o tipo IMessage
  const [selectedContactId, setSelectedContactId] = useState<string>('');
  const { username } = useParams<{ username: string }>();

  const messageFilter = messages.filter((item: IMessage) => item);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    props.setSelectedMenu(3)
  
    async function getMessages(){
      const mensagens = await axios.get<IMessage[]>("http://localhost:5000/mensagens");
      setMessages(mensagens.data);
    }
    getMessages()
  
    async function getContacts(){
      const response = await axios.get<Contact[]>('http://localhost:5000/contacts');
      setContacts(response.data);
    }
    getContacts()

    // evento para receber mensagens
    socket.on('message', (message: IMessage) => {
      setMessages([...messages, message]);
    });

        // evento para receber lista de contatos
        socket.on('contacts', (contacts: Contact[]) => {
          setContacts(contacts);
        });
  }, [])

    // envia mensagem para o servidor
    const sendMessage = () => {
      const message = {
        id: messages.length + 1,
        content: inputText,
        timestamp: new Date().toISOString(),
        senderName: username || 'unknown',
      };
      socket.emit('sendMessage', message);
      setMessages([...messages, message]);
      setInputText('');
    };
    
  return (
    <div className={styles.chatScreen}>

      <div className={styles.chatHeader}>
        <a href="/chatList">
          <FaChevronLeft className={styles.faArrowLeft}/>
        </a>
        
          <h2>{selectedContactId}</h2>
          <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${username}`}/>
          <h1>{ username }</h1>
      </div>

      <div className={styles.chatMain}>
        <ul>
              {messageFilter.map((item) => 
                <li className={item.id === 1 ? styles.friendMessage : styles.myMessage}>
                  <div>
                    <p>{item.content}</p>
                    <p className={styles.messageTime}>{item.timestamp}</p>
                  </div>
                </li>
                )}
          </ul>
          
      </div>

      <div className={styles.chatFooter}>
        <input 
        type = "text"  
        placeholder='Mensagem' 
        value={inputText} 
        onChange={(event) => setInputText(event.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            sendMessage();
          }
        }}/>

            <FaArrowRight 
            className={styles.faArrowRight}
            onClick={sendMessage}
            />
            
      </div>
    </div>
  );
}