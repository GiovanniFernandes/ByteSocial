import { IoMdSend } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './NewPost.module.scss';
import { useApiPost } from "hooks/useApiPost";
import { BaseSyntheticEvent, useState} from "react";

type Inputs = {
    postText: string,
};

const DEFAULT_HEIGHT_TEXTAREA = '22px'

export default function NewPost({change}:{change: React.Dispatch<React.SetStateAction<boolean>>}) {

    const { register, handleSubmit, reset } = useForm<Inputs>();
    const apiPost = useApiPost();

    const [hState, setHState ] = useState <HTMLElement | null >(null)

    
    const onSubmit: SubmitHandler<Inputs> = async data => {
        
        const content = data.postText.trimEnd().trimStart();

        const dataMsg:{content:string} = await apiPost.newPost(content);    
        
        if (!dataMsg.content) {
            console.log("Erro: Newpost")
            return
        }
        change(true)
        if (hState)
            hState.style.height = DEFAULT_HEIGHT_TEXTAREA;
        
        reset()
        
        
    }
    
    const changeHeight = (e: BaseSyntheticEvent) => {
        
        if (!e) return
        
        if(e.currentTarget)
            setHState(e.currentTarget)
        
        const target = e.target ? e.target : e;
    
        target.style.height = DEFAULT_HEIGHT_TEXTAREA;
        target.style.height = `${target.scrollHeight}px`
        
    }

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.newPost}
        >
            <textarea
                {...register("postText", { required: true })}
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
