import styles from './Welcome.module.scss'
import { ReactComponent as Logo } from 'assets/logo.svg'
import {ReactComponent as Nome } from 'assets/ByteSocial.svg'
import {ReactComponent as Illustration} from 'assets/Illustration.svg'

export default function Welcome({ children }: {children: JSX.Element}) {
  return(
    <div className={styles.welcome}>
      <div className={styles.welcome__logo}>
        <Logo className={styles.welcome__logo__svg__nome_illustration}/>
        <Illustration className={styles.welcome__logo__svg__illustration}/> 
        <Nome className={styles.welcome__logo__svg__nome}/>
      </div>
      <div className={styles.welcome__form}>
        {children}
      </div>
    </div>
  )
}
