import { IoMdSend } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './NewPost.module.scss';
import { useApiPost } from "hooks/useApiPost";
import { useRef, useState } from "react";

type Inputs = {
    postText: string,
};


export default function NewPost({change}:{change: React.Dispatch<React.SetStateAction<boolean>>}) {

    const { register, handleSubmit, reset } = useForm<Inputs>();
    const apiPost = useApiPost();

    const refTextarea = useRef<HTMLTextAreaElement>(null);
    const defaultHeightTextarea = useRef(22);


    const onSubmit: SubmitHandler<Inputs> = async data => {
        await apiPost.newPost(data.postText);    
        change(true)
        reset()
    }

    const changeHeight = () => { 
        
        const element = refTextarea.current;
        
        if (!element) return
        
        element.style.height = `${defaultHeightTextarea.current}px`;
        element.style.height = `${element.scrollHeight}px`
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
                ref={refTextarea}
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

/*
        const changeHeight = (e: any) => { 
      
        Não entendi, mas funcionou, apenas com "e:any", mas não entendi, parecia que 
        o e: tinha propriedades de mais de um objeto do "React.ChangeEvent<HTMLTextAreaElement>" e
        do "HTMLTextAreaElement"

        if (!e)
            return
        
        const target = e.target ? e.target : e;
        
        target.style.height = `${defaultHeightTextarea.current}px`;
        target.style.height = `${target.scrollHeight}px`

        }   


*/