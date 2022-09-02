import Welcome from 'pages/Welcome';
import Cadastro from 'pages/Welcome/cadastro';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from 'pages/Welcome/login';

export default function AppRouter() {
  return (
    <main className="container">
      <Router>
        
        <Routes>
          <Route path='/' element={<Welcome />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Cadastro />} />
          </Route>
        </Routes>

      </Router>
    </main>
  );
}
