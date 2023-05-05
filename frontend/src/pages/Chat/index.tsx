import React, { useState, useEffect, useRef } from 'react';
import styles from "./Chat.module.scss";
import { FaChevronLeft, FaList, FaArrowRight, FaNpm } from 'react-icons/fa';
import io from 'socket.io-client';
import axios from "axios";

const socket = io('http://localhost:3000'); //colocar a porta do backend



interface IMessage {
  id: number;
  content: string;
  timestamp: string;
  senderName: string;
}

interface Props {
  selectedMenu: number,
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>
}

interface Contact {
  username: string,
  id:string
}

export default function Chat(props: Props) {
  const [inputText, setInputText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState<Array<IMessage>>([]);

  const messageFilter = message.filter((item: IMessage) => item);



  useEffect(() => {
    props.setSelectedMenu(3)

    async function getMessages(){
      const mensagens = await axios.get<Array<IMessage>>("http://localhost:5000/mensagens");
      setMessage(mensagens.data);
    }
    getMessages()
  }, [])
  
  return (
    <div className={styles.chatScreen}>
      <div className={styles.chatHeader}>
        <a href="/chatList">
          <FaChevronLeft className={styles.faArrowLeft}/>
        </a>
          
          <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${"terencio"}`}/>
          <h1>Terencio</h1>
      </div>

      <div className={styles.chatMain}>
        <ul>
              {messageFilter.map((item) => 
                <li className={item.id === 1 ? styles.myMessage : styles.friendMessage}>
                  <div>
                    <p>{item.content}</p>
                    <p className={styles.messageTime}>{item.timestamp}</p>
                  </div>
                </li>
                )}
          </ul>
          
      </div>

      <div className={styles.chatFooter}>
        <input type = "text"  placeholder='Mensagem'/>
          <FaArrowRight className={styles.faArrowRight}/>
      </div>
    </div>
  );
}

