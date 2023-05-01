import React, { useState, useEffect, useRef } from 'react';
import styles from "./Chat.module.scss";
import { FaChevronLeft, FaList, FaArrowRight } from 'react-icons/fa';
import io from 'socket.io-client';
import axios from "axios";

const socket = io('http://localhost:3000'); //colocar a porta do backend

const mensagens = [
  {
    id: 1,
    content: "Olá, tudo bem?",
    timestamp: "2023-04-30T14:30:00.000Z",
    senderName: "João",
  },
  {
    id: 2,
    content: "Tudo sim, e você?",
    timestamp: "2023-04-30T14:31:00.000Z",
    senderName: "Maria",
  },
  {
    id: 1,
    content: "Estou bem também, obrigado",
    timestamp: "2023-04-30T14:32:00.000Z",
    senderName: "João",
  },
  {
    id: 1,
    content: "Como está sua familia?",
    timestamp: "2023-04-30T14:32:00.000Z",
    senderName: "João",
  },
  {
    id: 2,
    content: "está bem, minha mae fez uma cirurgia esses dias, mas ja recebeu alta do hospital",
    timestamp: "2023-04-30T14:32:00.000Z",
    senderName: "João",
  },
  {
    id: 1,
    content: "Ah que bom fico feliz que ela ja esteja bem.",
    timestamp: "2023-04-30T14:32:00.000Z",
    senderName: "João",
  },
  {
    id: 2,
    content: "e você, como ta indo nos estudos? já conseguiu terminar a faculdade e pegar um estágio",
    timestamp: "2023-04-30T14:32:00.000Z",
    senderName: "João",
  },
];

interface IMessage {
  authorId: number;
  message: string;
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
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState<Array<Contact>>([]);

  // useEffect(() => {
  //   socket.emit('add-user', { userId: "" });

  //   socket.on('new-message', ({ authorId, savedMessage }) => {
  //     setMessages([...messages, { authorId, message: savedMessage }]);
  //   });

  //   return () => {
  //     socket.off('new-message');
  //   };
  // }, [messages]);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const authorId = 123; // colocar o ID do usuário atual aqui
  //   const savedMessage = inputText;
  //   socket.emit('send-message', { authorId, savedMessage });
  //   setInputText('');
  // };

  useEffect(() => {
    props.setSelectedMenu(3)

    async function getMessages(){
      const mensagens = await axios.get<Array<Contact>>("http://localhost:5000/mensagens");
      setList(mensagens.data);
    }
    getMessages()
  }, [])
  
  return (
    <div className={styles.chatScreen}>
      <div className={styles.chatHeader}>
        <a href="/contactList">
          <FaChevronLeft className={styles.faArrowLeft}/>
        </a>
          
          <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${"terencio"}`}/>
          <h1>Terencio</h1>
      </div>

      <div className={styles.chatMain}>
        <ul>
              {mensagens.map((item) => 
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

