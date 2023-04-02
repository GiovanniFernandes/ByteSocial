import { IoMdSend } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './NewPost.module.scss';
import { useApiPost } from "hooks/useApiPost";

type Inputs = {
    postText: string,
};

/*
interface Props { //não entendi por que não fumciona
    change: React.Dispatch<React.SetStateAction<boolean>>
} */

export default function NewPost(props: any) {

    const { register, handleSubmit, reset } = useForm<Inputs>();
    const apiPost = useApiPost();


    const onSubmit: SubmitHandler<Inputs> = async data => {
        await apiPost.newPost(data.postText);    
        props.change(true)
        reset()
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
            rows={1}
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
