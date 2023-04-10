import './App.css'
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3001');

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  function joinRoom() {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }
  
  const sendMessage = () => {
    socket.emit("send_message", { message, room })
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket])

  return (
    <div className="App">
      <input 
        placeholder='Room Number...'
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input placeholder='Message...' onChange={(event) => {
        setMessage(event.target.value);
      }} />
      <button onClick={sendMessage}>Send message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  )
}

export default App
