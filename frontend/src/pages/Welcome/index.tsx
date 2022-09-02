import { Outlet } from 'react-router-dom'
import styles from './Welcome.module.scss'
import { ReactComponent as Logo } from 'assets/logo.svg'
import React from 'react'

export default function WelcomeCover({ children }: {children?: React.ReactNode}) {
  return(
    <div className={styles.welcome}>
      <div className={styles.welcome__logo}>
        <Logo/>
      </div>
      <div className={styles.welcome__form}>
        <Outlet/>
        {children}
      </div>
    </div>
  )
}
