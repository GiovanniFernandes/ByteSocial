import styles from '../Welcome.module.scss'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from 'contexts/Auth/AuthContexts'
import { SubmitHandler, useForm } from 'react-hook-form'
import SpanError from 'components/SpanError/SpanError'

type Inputs = {
  email: string,
  password: string
}


export default function Login() {

  const { register, handleSubmit, resetField } = useForm<Inputs>()

  const [erroLogin, setErroLogin] = useState<string>("")
  const auth = useContext(AuthContext);
  const navigate = useNavigate();


  const realizarLogin: SubmitHandler<Inputs> = async data => {
    const isLogged = await auth.signin(data.email,data.password)
    
    if(isLogged === true){
      navigate('/home')
    }
    else {
      resetField("password")
      setErroLogin("Usuário ou senha incorretos")
    }
}

  
  return (
    <form onSubmit={handleSubmit(realizarLogin)} className={styles.formulario}>
      <h1 className={styles.formulario__title}>Faça seu login</h1>
      <p className={styles.formulario__texto}>Para entrar na maior comunidade dev do Ramo</p>
      
      <div className={styles.formulario__input}>
        <input
          type="email"
          className={styles.formulario__input__filho}
          placeholder='Digite seu email'
          {...register('email', { required: true })}
        />
        <input
          type="password"
          className={styles.formulario__input__filho}
          placeholder='Digite sua senha'
          {...register('password', { required: true })}
        />  
      </div>
      <SpanError err={erroLogin} />
      <div>
        <button type='reset' className={styles.formulario__botoes__register}
          onClick={() => navigate('/register')}>
          Cadastre-se
        </button>
        <button type="submit" className={styles.formulario__botoes__submit} >
          Login
        </button>
      </div>
    </form>
  )
}
