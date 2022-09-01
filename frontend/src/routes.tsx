import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login/login';

export default function AppRouter() {
  return (
    <main className="container">
      <Router>
        
        <Routes>
          <Route path='/' element={<Login />} />
          {/* <Route path='/register' element={<Cadastro />} /> */}
        </Routes>

      </Router>
    </main>
  );
}
