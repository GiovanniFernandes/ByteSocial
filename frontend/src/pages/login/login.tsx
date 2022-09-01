import styles from './Login.module.scss'
import { ReactComponent as Logo } from '../../assets/logo.svg'

export default function Login() {
  return(
    <>
      <div className={styles.logo}>
        <Logo/>
      </div>
      <form className={styles.formulario}>
        <h1 className={styles.formulario__title}>Faça seu login</h1>
        <p>Para entrar na maior comunidade dev do Ramo</p>
        <input type="email" className={styles.formulario__input} id="" placeholder='Digite seu email' required/>
        <input type="password" className={styles.formulario__input} id="" placeholder='Digite sua senha' required/>
        <button className={styles.formulario__register}>Cadastre-se</button>
        <button type="submit" className={styles.formulario__login}>Login</button>
      </form>
    </>
  )
}