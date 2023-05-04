import {AuthContext} from 'contexts/Auth/AuthContexts';
import styles from './Post.module.scss';
import {ChatCircle, Heart} from 'phosphor-react';
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useApiPost} from 'hooks/useApiPost';


interface Props {
    id : string,
    username : string,
    conteudo : string,
    dataPostagem : string,
    curtidas : number,
    comentario : number,
    userId : string,
    liked: boolean,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

type Data = {
    msg:string
}

export default function Post(props : Props) {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const apiPost = useApiPost();

    const [like,
        setLike] = useState < boolean > (props.liked)

    const white = '#FFFFFF'
    const blue = '#0068DF'

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

    const clickLike = async() => {

        const data:Data = await apiPost.iLike(props.id);
        if (data.msg === 'ok') {
            setLike(e => !e);
            props.setRefresh(true)
        } else {
            console.log("ERRO LIKED")
        }

    }

    return (
        <div className={styles.Post__content}>
            <div className={styles.Post__content__user}>
                <div className={styles.Post__content__user__img} onClick={toOtherUser}>
                    <img
                        src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${props.username}`}
                        alt="Foto de perfil"
                        className={styles.Post__content__user__img}/>
                </div>
                <div className={styles.Post__content__user__userInfo}>
                    <h4
                        onClick={toOtherUser}
                        className={styles.Post__content__user__userInfo__name}>{props.username}</h4>
                    <p className={styles.Post__content__user__userInfo__PostDate}>{props.dataPostagem}</p>
                </div>
            </div>

            <div className={styles.Post__content__text}>
                <p>{props.conteudo}</p>
            </div>

            <div className={styles.Post__content__icons}>

                <button
                    type='reset'
                    className={styles.Post__content__icons__Like}
                    style={like
                    ? {
                        backgroundColor: blue
                    }
                    : {
                        backgroundColor: white
                    }}
                    onClick={clickLike}>

                    <Heart
                        size={16}
                        color={(like)
                        ? white
                        : blue}
                        weight={(like)
                        ? "fill"
                        : "regular"}/>
                    <p
                        className={styles.Post__content__icons__Like__text}
                        style={(like
                        ? {
                            color: white
                        }
                        : {
                            color: blue
                        })}>{props.curtidas}</p>

                </button>

                <div className={styles.Post__content__icons__Comment}>
                    <ChatCircle size={16} color="#0068DF"/>
                    <p className={styles.Post__content__icons__Comment__text}>{props.comentario}
                    </p>
                </div>

            </div>

        </div>
    )
}
