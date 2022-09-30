import styles from '../Welcome.module.scss'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'

interface IValidacao {
  token: string
}

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const realizarLogin = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post<IValidacao>('http://localhost:3021/login',
      {
        email,
        password
      }).then(resposta => {

        if (resposta.data.token) {
          console.log("Resposta do TOKEN: ", resposta.data.token)
        }
      }).catch(erro => {
        console.log(erro)
      })
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
      <button className={styles.formulario__register}>
        <Link to='/register'>Cadastre-se</Link>
      </button>
      <button type="submit" className={styles.formulario__submit} >
        Login
      </button>
    </form>
  )
}
