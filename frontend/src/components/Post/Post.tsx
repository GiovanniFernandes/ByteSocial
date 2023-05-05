import {AuthContext} from 'contexts/Auth/AuthContexts';
import styles from './Post.module.scss';
import {ChatCircle, DotsThreeOutline, Heart, Trash} from 'phosphor-react';
import {useContext, useMemo, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useApiPost} from 'hooks/useApiPost';
import MenuEdit from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
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

type Data = {
    msg: string
}

export default function Post(props : Props) {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const apiPost = useApiPost();
    
    const [like,setLike] = useState < boolean > (props.liked)
    const white = '#FFFFFF';
    const blue = '#0068DF';
    
    
    const currentUserIdxUserId = useMemo(() => {
        if (auth.user) 
            return auth.user.id === Number(props.userId)
        else 
            return false
    }, [auth.user])

    const [anchorEl, setAnchorEl] = useState < null | HTMLElement > (null);
    const openMenuEdit = Boolean(anchorEl);


    const handleClickMenuEditOpen = (event : React.MouseEvent < HTMLButtonElement >) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClickMenuEditClose = () => {
        setAnchorEl(null);
    }

    const handleClickDeletePost = async () => {
        const data: Data = await apiPost.deletePost(props.id);

        if (data.msg === "Post deletado com sucesso!") {
            setAnchorEl(null);
            props.setRefresh(true);
        }
        else
            console.log('ERRO AO DELETAR Post');
    }

    
    const handleClickLike = async() => {

        const data : Data = await apiPost.iLike(props.id);
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
                {currentUserIdxUserId && <button type='reset' onClick={handleClickMenuEditOpen}>
                    <DotsThreeOutline size={20} color="#0068df" weight="fill"/>
                </button>}
                <div>
                    <MenuEdit
                        open={openMenuEdit}
                        anchorEl={anchorEl}
                        onClose={handleClickMenuEditClose}
                        elevation={0}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}>
                        <MenuItem onClick={handleClickDeletePost}>
                            <Trash size={16} color="#e00016" weight="duotone"/>
                            <label className={styles.Post__content__containerEdit_menuItem_label}>deletar post</label>
                        </MenuItem>
                    </MenuEdit>

                </div>
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
                        backgroundColor: blue
                    }
                    : {
                        backgroundColor: white
                    }}
                    onClick={handleClickLike}>

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

            </section>

        </div>
    )
}
