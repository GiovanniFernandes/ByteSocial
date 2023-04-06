import { IoMdSend } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './NewPost.module.scss';
import { useApiPost } from "hooks/useApiPost";
import { useRef} from "react";

type Inputs = {
    postText: string,
};


export default function NewPost({change}:{change: React.Dispatch<React.SetStateAction<boolean>>}) {

    const { register, handleSubmit, reset } = useForm<Inputs>();
    const apiPost = useApiPost();

    const defaultHeightTextarea = useRef(22);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        await apiPost.newPost(data.postText);    
        change(true)
        reset()
    }
    
    const changeHeight = (e:any) => {
        
        if (!e) return
    
        const target = e.target ? e.target : e;
    
        target.style.height = `${defaultHeightTextarea.current}px`;
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

/**
    Simplesmente não entendi.
    Duas situações distintas, mas que não entendi de jeito nenhum kkk
 */

/*      A PRIMEIRA !

        const changeHeight = (e: any) => { 
      
        if (!e)
            return
        
        const target = e.target ? e.target : e;
        
        target.style.height = `${defaultHeightTextarea.current}px`;
        target.style.height = `${target.scrollHeight}px`
        }   

        RESULTADO: Aqui o textArea sobe e desce normalmente e faz o submit 

        Conclusão: Por mais que faça o que preciso, não entendi o por que de apenas funcionar  com "e:any", parecia que o e: tinha propriedades de mais de um objeto do "React.ChangeEvent<HTMLTextAreaElement>" e do "HTMLTextAreaElement"
*/

/*      A SEGUNDA !

        
        let refTextarea = useRef<HTMLTextAreaElement>(null);


        const changeHeight = () => {
        const element = refTextarea;
        
        if (!element) return
        
        element.style.height = `${defaultHeightTextarea.current}px`;
        element.style.height = `${element.scrollHeight}px`

    }
    // acrescentando esse ref ter acesso aos elementos DOM do elemento

        <textarea
            ref={refTextarea}
            onChange={changeHeight}
        />


    RESULTADO: Aqui o textarea sobe e desce, mas por conta do 'ref' parou de fazer submit.
    se retirar o ref, volta a fazer submit, mas o ref não deveria interfirir em nada no submit do forms, o botão clica normalmente, mas não faz mais submit.

    Obs. tentei usar um useState no lugar do useRef, mas também não funcionou.
    
    React.FormEvent<HTMLButtonElement>
*/