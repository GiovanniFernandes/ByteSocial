import {AuthContext} from 'contexts/Auth/AuthContexts';
import styles from './Post.module.scss';
import {ChatCircle, Heart, TrashSimple} from 'phosphor-react';
import {useContext, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useApiPost} from 'hooks/useApiPost';
import { IData } from 'types/IData';

interface Props {
    id : string,
    username : string,
    conteudo : string,
    dataPostagem : string,
    curtidas : number,
    comentario : number,
    userId : string,
    liked : boolean,
    setRefresh : React.Dispatch < React.SetStateAction < boolean >>
}



const LIKE_COLOR_WHITE = '#FFFFFF';
const LIKE_COLOR_BLUE = '#0068DF';
const DELETE_POST_COLOR = '#F26169'

export default function Post(props : Props) {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const apiPost = useApiPost();
    
    const [like,setLike] = useState < boolean > (props.liked)
  
    const currentUserIdxUserId = useMemo(() => {
        if (auth.user) 
            return auth.user.id === Number(props.userId)
        else 
            return false
    }, [auth.user])


    const handleClickDeletePost = async () => {
        const data: IData = await apiPost.deletePost(props.id);

        if (data.msg === "Post deletado com sucesso!") {
            props.setRefresh(true);
        }
        else
            console.log('ERRO AO DELETAR Post');
    }

    
    const handleClickLike = async() => {

        const data : IData = await apiPost.iLike(props.id);
        if (data.msg === 'ok') {
            setLike(e => !e);
            props.setRefresh(true)
        } else {
            console.log("ERRO LIKED")
        }

    }


    const handleClickProfileUser = () => {
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

            <section className={styles.Post__content__containerEdit}>
                {currentUserIdxUserId && <button type='reset' onClick={handleClickDeletePost}>
                    <TrashSimple size={17} color={DELETE_POST_COLOR} weight="fill" />
                </button>}
            </section>

            <section className={styles.Post__content__user}>
                <div className={styles.Post__content__user__img} onClick={handleClickProfileUser}>
                    <img
                        src={`https://avatar.uimaterial.com/?setId=0496UVJDTqyd2eCIAa46&name=${props.username}`}
                        alt="Foto de perfil"
                        className={styles.Post__content__user__img}/>
                </div>
                <div className={styles.Post__content__user__userInfo}>
                    <h4
                        onClick={handleClickProfileUser}
                        className={styles.Post__content__user__userInfo__name}>{props.username}</h4>
                    <p className={styles.Post__content__user__userInfo__PostDate}>{props.dataPostagem}</p>
                </div>
            </section>

            <section className={styles.Post__content__text}>
                <p>{props.conteudo}</p>
            </section>

            <section className={styles.Post__content__icons}>

                <button
                    type='reset'
                    className={styles.Post__content__icons__Like}
                    style={like
                    ? {
                        backgroundColor: LIKE_COLOR_BLUE
                    }
                    : {
                        backgroundColor: LIKE_COLOR_WHITE
                    }}
                    onClick={handleClickLike}>

                    <Heart
                        size={16}
                        color={(like)
                        ? LIKE_COLOR_WHITE
                        : LIKE_COLOR_BLUE}
                        weight={(like)
                        ? "fill"
                        : "regular"}/>
                    <p
                        className={styles.Post__content__icons__Like__text}
                        style={(like
                        ? {
                            color: LIKE_COLOR_WHITE
                        }
                        : {
                            color: LIKE_COLOR_BLUE
                        })}>{props.curtidas}</p>

                </button>

                <div className={styles.Post__content__icons__Comment}>
                    <ChatCircle size={16} color="#0068DF"/>
                    <p className={styles.Post__content__icons__Comment__text}>{props.comentario}
                    </p>
                </div>

            </section>

        </div>
    )
}
