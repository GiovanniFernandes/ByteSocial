import { AuthContext } from 'contexts/Auth/AuthContexts';
import styles from './Post.module.scss' ;
import { ChatCircle, Heart } from 'phosphor-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';



interface Props {
  id?:string,
  username: string,
  conteudo: string,
  dataPostagem: string,
  curtidas: number,
  comentario: number,
  userId: string 
}


export default function Post(props: Props){
  
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  
  const toOtherUser = () => {

    const user = auth.user;

    if (user !== null) {
      if (user.id.toString() === props.userId) {
        navigate(`/profile`)
        return
      }
    }

    navigate(`/otherUser/${props.userId}`)
  }
  
  return (
    <div className={styles.Post__content}>
    <div className={styles.Post__content__user}>
        <div className={styles.Post__content__user__img}
        onClick={toOtherUser}
        >
          <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${props.username}`} alt="Foto de perfil" className={styles.Post__content__user__img} />
        </div>
        <div className={styles.Post__content__user__userInfo}>
          <h4
            onClick={toOtherUser}
            className={styles.Post__content__user__userInfo__name}
          >{props.username}</h4>
    <p className={styles.Post__content__user__userInfo__PostDate}>{props.dataPostagem}</p>
        </div>
    </div>
      
      <div className={styles.Post__content__text}>
    <p>{props.conteudo}</p>
      </div>
      <div className={styles.Post__content__icons}>
        <div className={styles.Post__content__icons__Like}>
            <Heart size={16}  color="#FFFFFF" weight="fill" />
    <p className={styles.Post__content__icons__Like__text}>{props.curtidas}</p>
          
        </div>
        <div className={styles.Post__content__icons__Comment}>
          <ChatCircle className={styles.Post__icons__Comment__svg}size={16} color="#0068DF" />
          <p className={styles.Post__content__icons__Comment__text}>{props.comentario} </p>
        </div>
      </div>

  </div>
  ) 
}

