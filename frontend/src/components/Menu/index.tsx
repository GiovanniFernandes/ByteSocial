import styles from './Menu.module.scss'
import menu from 'data/menu.json'
import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'contexts/Auth/AuthContexts'
import { useMenuContext } from 'contexts/Menu/MenuContexts'
import { ImageUser } from 'components/ImageUser'

type IMenuItem = typeof menu[0]

export default function Menu({selectedMenu}: {selectedMenu: number}) {

  const [selectedItem, setSelectedItem] = useState<number | null>(1)

  const { openState, setOpenState } = useMenuContext();

  const [username, setUsername] = useState<string | null>('')
  
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  useEffect(()=>{
    setSelectedItem(selectedMenu)
    getUser();
  },[selectedMenu, auth.user])

  
  const getUser = async () => {
      if(auth.user != null)
        setUsername(auth.user.username) 
      else 
        setUsername("")
  }

  function selectMenuItem (item: IMenuItem) {
    
    setSelectedItem(item.id)

    if(item.title === 'Sair')
      auth.signout();

    navigate(item.link);
  }

  function onHideBtnClick() {
    setOpenState(!openState)
  }

  if (openState) {
    return (
      <div className={styles.menu}>
        <div className={styles.menu__hideAligner}>
          <button className={styles.menu__hideButton} onClick={() => onHideBtnClick()}>
            {'<'}
          </button>
        </div>
        <div className={styles.menu__user}>
          <div className={styles.menu__user__pic}>
            {/*<img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${username}`} alt="Foto de perfil" />*/}
            <ImageUser username={username} description='Foto de Perfil' />
          </div>
          <p className={styles.menu__user__name}>{username}</p>
        </div>
        <ul className={styles.menu__list}>

          {menu.map((item) => (

            <li key={item.id} 
            className={ classNames({[styles.menu__item]: item.id !== selectedItem, [styles.menu__item__selected]: item.id === selectedItem})} onClick={() => selectMenuItem(item)}>

                <div className={styles.menu__item__icon}>
                    <img src={item.id === selectedItem ? item.iconSelected : item.icon} alt={item.title} />
              </div>

              <p className={styles.menu__item__text}>
                {item.title}
              </p>
            </li>


          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <div className={styles.menu__closed}>
        <div className={styles.menu__hideAligner}>
          <button className={styles.menu__hideButton} onClick={() => onHideBtnClick()}>
            {'>'}
          </button>
        </div>
        <div className={styles.menu__user__closed}>
          <div className={styles.menu__user__pic}>
          <ImageUser username={username} description='Foto de Perfil' />
          </div>
        </div>
        <ul className={styles.menu__list__closed}>
          {menu.map((item) => (
            <li key={item.id} className={classNames({[styles.menu__item]: item.id !== selectedItem, [styles.menu__item__selected]: item.id === selectedItem})} onClick={() => selectMenuItem(item)}>
              <div className={styles.menu__item__icon__closed}>

                <img src={item.id === selectedItem ? item.iconSelected : item.icon} alt={item.title} />
              
              </div>

            </li>

          ))}
        </ul>
      </div>
    )
  }
}
