import styles from '../Welcome.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useApiUser } from 'hooks/useApiUser'


export default function Cadastro() {
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const apiUser = useApiUser();

  const realizaCadastro = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== password2) {
      alert("As senhas precisam ser iguais!")
      return
    }
    else{
      const newUser = await apiUser.novoUsuario(username, email, password); 
      debugger
      /* Modificações necessárias aqui para tratar erros, Aqui o back tem que me retorna verdadeiro ou false, ou
      um objeto para saber se é pq tinha e mail já havia sido cadastrado ou, ainda erro interno */
      
      alert("cadastro realizadom sucesso");
    }
    
  }

  return(
      <form onSubmit={realizaCadastro} className={styles.formulario}>
        <h1 className={styles.formulario__title}>Faça seu cadastro</h1>
        <p className={styles.formulario__texto}>Para entrar na maior comunidade dev do Ramo</p>
        <input type="text" className={styles.formulario__input} id="" 
          placeholder='Digite seu nome de usuário' required
          onChange={event => setUsername(event.target.value)}/>
        <input type="email" className={styles.formulario__input} id="" 
          placeholder='Digite seu email' required
          onChange={event => setEmail(event.target.value)}/>
        <input type="password" className={styles.formulario__input} id="" 
          placeholder='Digite sua senha' required
          onChange={event => setPassword(event.target.value)}/>
        <input type="password" className={styles.formulario__input} id="" 
          placeholder='Confirme sua senha' required
          onChange={event => setPassword2(event.target.value)}/>
        <button className={styles.formulario__register}>
          <Link to='/login'>Cancelar</Link>
        </button>
        <button type="submit" className={styles.formulario__submit} >
          Cadastre-se
        </button>
      </form>
  )
}
