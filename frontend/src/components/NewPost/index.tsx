import { IoMdSend } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './NewPost.module.scss';
import { useApiPost } from "hooks/useApiPost";
import { useState } from "react";

type Inputs = {
    postText: string,
};


export default function NewPost({change}:{change: React.Dispatch<React.SetStateAction<boolean>>}) {

    const { register, handleSubmit, reset } = useForm<Inputs>();
    const [height, setHeigh] = useState(22);
    const apiPost = useApiPost();

    const onSubmit: SubmitHandler<Inputs> = async data => {
        await apiPost.newPost(data.postText);    
        change(true)
        reset()
    }
    
    const changeHeight = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        
        setHeigh(e.target.scrollHeight);
    }

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.newPost}
        >
            <textarea
                {...register("postText", { required: true })}
                style={{height:`${height}px`}}
                className={styles.newPost__input}
                placeholder='O que você está pensando?'
                onChange={changeHeight}
            />
                <button
                type="submit"
                className={styles.newPost__send}
                >
                    <IoMdSend
                    className={styles.newPost__send__icon}
                    size={30}
                    color='#52A3FF'
                    />
                </button>
                
        </form>
    )
}
