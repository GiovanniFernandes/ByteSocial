import Welcome from 'pages/Welcome';
import Cadastro from 'pages/Welcome/cadastro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from 'pages/Welcome/login';
import { Test } from 'components/Test';
import Profile from 'pages/profile';
import DefaultPage from 'components/DefaultPage';
import { useState } from 'react';
import Settings from 'pages/Settings';
import Home from 'pages/Home';
import ContactList from 'pages/ContactList';


export default function AppRouter() {
  
  const [selectedMenu, setSelectedMenu] = useState<number>(1)

  return (
    
    <main className="container">
      <Router>
        
        <Routes>

          <Route path='/' element={<DefaultPage selectedMenu={selectedMenu}/>}>
            <Route path='home' element={<Home selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>}/>
            <Route path='profile' element={<Profile selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>} />
            <Route path='settings' element={<Settings selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>} />
          </Route>

          <Route path='/login' element={<Welcome children={<Login/>}/>} />
          <Route path='/register' element={<Welcome children={<Cadastro />}/>} />

          <Route path='/contactlist' element={<ContactList/>} />

          


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