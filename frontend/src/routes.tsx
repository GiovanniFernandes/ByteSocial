import Welcome from 'pages/Welcome';
import Cadastro from 'pages/Welcome/cadastro';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from 'pages/Welcome/login';
import Menu from 'components/Menu';
import { RequireAuth } from 'contexts/Auth/RequireAuth';
import { Test } from 'components/Test';


export default function AppRouter() {
  

  return (
    
    <main className="container">
      <Router>
        
        <Routes>
          <Route path='/' element={<RequireAuth children={<Navigate to={'/home'} />}/>} />
          <Route path='/login' element={<Welcome children={<Login/>}/>} />
          <Route path='/register' element={<Welcome children={<Cadastro />}/>} />
          <Route path='/home' element={<RequireAuth children={<Menu/>}/>} /> 
          <Route path='/teste' element={<RequireAuth><Test/></RequireAuth>} />
          
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