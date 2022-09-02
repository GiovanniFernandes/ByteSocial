import styles from '../Welcome.module.scss'
import { Link } from 'react-router-dom'

export default function Cadastro() {
  return(
      <form className={styles.formulario}>
        <h1 className={styles.formulario__title}>Faça seu cadastro</h1>
        <p>Para entrar na maior comunidade dev do Ramo</p>
        <input type="email" className={styles.formulario__input} id="" placeholder='Digite seu nome de usuário' required/>
        <input type="password" className={styles.formulario__input} id="" placeholder='Digite seu email' required/>
        <input type="password" className={styles.formulario__input} id="" placeholder='Digite sua senha' required/>
        <input type="password" className={styles.formulario__input} id="" placeholder='Confirme sua senha' required/>
        <button className={styles.formulario__register}>
          <Link to='/login'>Cancelar</Link>
        </button>
        <button type="submit" className={styles.formulario__login}>
          Cadastre-se
        </button>
      </form>
  )
}
