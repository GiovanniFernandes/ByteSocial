import Welcome from 'pages/Welcome';
import Cadastro from 'pages/Welcome/cadastro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from 'pages/Welcome/login';
import Profile from 'pages/profile';
import OtherUser from 'pages/OtherUser';
import DefaultPage from 'components/DefaultPage';
import { useState } from 'react';
import Settings from 'pages/Settings';
import Home from 'pages/Home';
import ContactList from 'pages/ContactList';
import ChatList from 'pages/ChatList';
import Chat from 'pages/Chat';


export default function AppRouter() {
  
  const [selectedMenu, setSelectedMenu] = useState<number>(1)

  return (
    
    <main className="container">
      <Router>
        
        <Routes>
           
          <Route path='chat' element={<Chat selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />} />
          

          <Route path='/' element={
            <DefaultPage selectedMenu={selectedMenu}>
              <Home selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
            </DefaultPage>}
          />


          <Route path='/' element={<DefaultPage selectedMenu={selectedMenu}/>}>
            <Route path='profile' element={<Profile selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>} />
            <Route path='settings' element={<Settings selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />} />
            <Route path='chatList' element={<ChatList selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />} />
            <Route path='contactlist' element={<ContactList selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />} />
            
 
            <Route path='otherUser/:postUserId' element={<OtherUser selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>}/>

          </Route>

          <Route path='/login' element={<Welcome children={<Login/>}/>} />
          <Route path='/register' element={<Welcome children={<Cadastro />}/>} />
          
          
        </Routes>   

      </Router>
    </main>

  );
}
