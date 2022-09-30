import styles from '../Welcome.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

interface IConfirmacao{
  id:string
}

export default function Cadastro() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const realizaCadastro = () => {

    if (password !== password2) {
      alert("As senhas precisam ser iguais!")
      return
    }

    axios.post<IConfirmacao>('localhost:3021/cadastro', 
    {
      username:username,
      email:email,
      password:password
    }).then(resposta => {
      
      if(resposta.data.id){
          console.log("Resposta do TOKEN: ", resposta.data.id)
      }
    }).catch(erro => {
      console.log(erro)
    })
  }


  return(
      <form className={styles.formulario}>
        <h1 className={styles.formulario__title}>Faça seu cadastro</h1>
        <p className={styles.formulario__texto}>Para entrar na maior comunidade dev do Ramo</p>
        <input type="text" className={styles.formulario__input} id="" placeholder='Digite seu nome de usuário' required
          onChange={event => setUsername(event.target.value)}/>
        <input type="email" className={styles.formulario__input} id="" placeholder='Digite seu email' required
          onChange={event => setEmail(event.target.value)}/>
        <input type="password" className={styles.formulario__input} id="" placeholder='Digite sua senha' required
          onChange={event => setPassword(event.target.value)}/>
        <input type="password" className={styles.formulario__input} id="" placeholder='Confirme sua senha' required
          onChange={event => setPassword2(event.target.value)}/>
        <button className={styles.formulario__register}>
          <Link to='/login'>Cancelar</Link>
        </button>
        <button type="submit" className={styles.formulario__submit} onClick={() => realizaCadastro()}>
          Cadastre-se
        </button>
      </form>
  )
}
