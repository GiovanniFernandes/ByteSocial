import styles from './requestConnection.module.scss'
import { X, Check } from "@phosphor-icons/react";



interface Props {
    user_id: number | string,
    email: string,
    username:string
}

export default function RequestConnection({user_id, email, username}: Props) {


    return (
    
    <div className={styles.Request__content}>

        <div className={styles.Request__content__user}>
            <div className={styles.Request__content__user__img}>
            <img src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${username}`} alt="Foto de perfil" className={styles.Request__content__user__img} />
            </div>

            <div className={styles.Request__content__user__userInfo}>
                <h4 className={styles.Request__content__user__userInfo__name}>{username}</h4>
                <p className={styles.Request__content__user__userInfo__RequestEmail}>{email}</p>
            </div>

            <div className={styles.ButtonContent}>
            <button style={{backgroundColor:"#36ff6e"}}className={styles.ButtonContent__ButtonOption}><Check size={32} /></button>
            <button style={{backgroundColor:"#F93944"}}className={styles.ButtonContent__ButtonOption}><X size={32}/></button>

            </div>
        </div> 
       
    </div>
        
    )

}
