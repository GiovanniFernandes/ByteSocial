import Menu from 'components/Menu';
import { AuthContext } from 'contexts/Auth/AuthContexts';
import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './DefaultPage.module.scss'

export default function DefaultPage({children, selectedMenu}:{children?:JSX.Element, selectedMenu: number}) {

  const auth = useContext(AuthContext);
    
  if(auth.user) {
    return(
      <div className={styles.page}>
        <Menu selectedMenu={selectedMenu}/>
        <div className={styles['children-container']}>
          <Outlet />
          {children}
        </div>
      </div>
    ) 
  } else {
    return <NavLink to = '/login'> Usuário não autenticado! Clique aqui para realizar login ou cadastrar-se. </NavLink>
  }
  
}