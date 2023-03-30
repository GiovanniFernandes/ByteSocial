import Welcome from 'pages/Welcome';
import Cadastro from 'pages/Welcome/cadastro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from 'pages/Welcome/login';
import Profile from 'pages/profile';
import DefaultPage from 'components/DefaultPage';
import { useState } from 'react';
import Settings from 'pages/Settings';
import Home from 'pages/Home';
import ContactList from 'pages/ContactList';
import ChatList from 'pages/ChatList';


export default function AppRouter() {
  
  const [selectedMenu, setSelectedMenu] = useState<number>(1)

  return (
    
    <main className="container">
      <Router>
        
        <Routes>

          <Route path='/' element={<DefaultPage selectedMenu={selectedMenu}/>}>
            <Route path='home' element={<Home selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>}/>
            <Route path='profile' element={<Profile selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>} />
            <Route path='settings' element={<Settings selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />} />
            <Route path='contactlist' element={<ContactList selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />} />
            <Route path='chatList' element={<ChatList selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />} />
          </Route>

          <Route path='/login' element={<Welcome children={<Login/>}/>} />
          <Route path='/register' element={<Welcome children={<Cadastro />}/>} />
          
          
          


        </Routes>   

      </Router>
    </main>

  );
}

/*
<Route path="/private" element={<RequireAuth><PaginaPrivada /></RequireAuth>} />
<Route path='/private' element={<RequireAuth> <PaginaPrivada /></RequireAuth>} />

loucura kkkk
isso aqui são coisas diferentes, não faz sentido kkkk
*/