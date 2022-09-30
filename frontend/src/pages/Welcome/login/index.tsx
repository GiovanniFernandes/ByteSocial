import styles from '../Welcome.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

interface IValidacao {
  token: string
}

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const realizarLogin = () => {
    axios.post<IValidacao>('localhost:3021/login',
      {
        email: email,
        password: password
      }).then(resposta => {

        if (resposta.data.token) {
          console.log("Resposta do TOKEN: ", resposta.data.token)
        }
      }).catch(erro => {
        console.log(erro)
      })
  }



  return (
    <form className={styles.formulario}>
      <h1 className={styles.formulario__title}>Faça seu login</h1>
      <p className={styles.formulario__texto}>Para entrar na maior comunidade dev do Ramo</p>
      <input
        type="email"
        className={styles.formulario__input}
        id=""
        placeholder='Digite seu email'
        required
        onChange={event => setEmail(event.target.value)}
      />
      <input
        type="password"
        className={styles.formulario__input}
        id=""
        placeholder='Digite sua senha'
        required
        onChange={event => setPassword(event.target.value)}
      />
      <button className={styles.formulario__register} onClick={() => { }}>
        <Link to='/register'>Cadastre-se</Link>
      </button>
      <button type="submit" className={styles.formulario__submit} onClick={() => realizarLogin()}>
        Login
      </button>
    </form>
  )
}
