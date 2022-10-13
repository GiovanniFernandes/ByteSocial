import styles from '../Welcome.module.scss'
import { useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { AuthContext } from 'contexts/Auth/AuthContexts'


export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const auth = useContext(AuthContext);
  const navigate = useNavigate();


  const realizarLogin = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isLogged = await auth.signin(email,password)

    if(isLogged===true){
      navigate('/home')
    }
    else {
      alert("Opa deu merda ! ")
    }
   
  }


  return (
    <form onSubmit={realizarLogin} className={styles.formulario}>
      <h1 className={styles.formulario__title}>Faça seu login</h1>
      <p className={styles.formulario__texto}>Para entrar na maior comunidade dev do Ramo</p>
      <input
        type="email"
        className={styles.formulario__input}
        id="email"
        placeholder='Digite seu email'
        required
        onChange={event => setEmail(event.target.value)}
      />
      <input
        type="password"
        className={styles.formulario__input}
        id="senha"
        placeholder='Digite sua senha'
        required
        onChange={event => setPassword(event.target.value)}
      />
      <button className={styles.formulario__register} onClick={() => navigate('/register')}>
        Cadastre-se
      </button>
      <button type="submit" className={styles.formulario__submit} >
        Login
      </button>
    </form>
  )
}
