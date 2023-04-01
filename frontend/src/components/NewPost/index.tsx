import { IoMdSend } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './NewPost.module.scss';
import { useApiPost } from "hooks/useApiPost";

type Inputs = {
    postText: string,
};

export default function NewPost() {

    const { register, handleSubmit, reset } = useForm<Inputs>();
    const apiPost = useApiPost();


    const onSubmit: SubmitHandler<Inputs> = async data => {
        const response = await apiPost.newPost(data.postText);
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
