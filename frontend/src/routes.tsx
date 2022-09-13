import Welcome from 'pages/Welcome';
import Cadastro from 'pages/Welcome/cadastro';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from 'pages/Welcome/login';
import Menu from 'components/Menu';

export default function AppRouter() {
  return (
    <main className="container">
      <Router>
        
        <Routes>
          <Route path='/' element={<Welcome />}>
            <Route path='' element={<Navigate to={'/login'} />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Cadastro />} />
          </Route>
          <Route path='/home' element={<Menu />} />
        </Routes>

      </Router>
    </main>
  );
}
