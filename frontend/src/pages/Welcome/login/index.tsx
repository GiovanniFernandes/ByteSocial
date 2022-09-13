import styles from '../Welcome.module.scss'
import { Link } from 'react-router-dom'

export default function Login() {
  return(
      <form className={styles.formulario}>
        <h1 className={styles.formulario__title}>Faça seu login</h1>
        <p className={styles.formulario__texto}>Para entrar na maior comunidade dev do Ramo</p>
        <input type="email" className={styles.formulario__input} id="" placeholder='Digite seu email' required/>
        <input type="password" className={styles.formulario__input} id="" placeholder='Digite sua senha' required/>
        <button className={styles.formulario__register} onClick={() => {}}>
          <Link to='/register'>Cadastre-se</Link>
        </button>
        <button type="submit" className={styles.formulario__submit}>
          Login
        </button>
      </form>
  )
}
